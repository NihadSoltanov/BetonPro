import React, { useEffect, useState, createContext, useMemo, useRef } from 'react';
import API from '../api/API';
import axios from 'axios';
import { client } from '../api/NetworkLayerCentral';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'user';
const PSW_KEY = 'psw';
const AGREEMENT_KEY = 'agreement_type';
const LAST_ACTIVE_KEY = 'last_active_iso';

const INACTIVITY_LIMIT_MS = 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({
    refresh_token: null,
    access_token: null,
    user: '',
    psw: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const respInterceptorIdRef = useRef(null);

  const setAuthHeader = (token) => {
    if (token) {
      client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete client.defaults.headers.common.Authorization;
    }
  };

  const nowIso = () => new Date().toISOString();

  const bumpLastActive = async () => {
    await AsyncStorage.setItem(LAST_ACTIVE_KEY, nowIso());
  };

  const isInactiveTooLong = (lastIso) => {
    if (!lastIso) return true;
    const last = new Date(lastIso).getTime();
    const diff = Date.now() - last;
    return diff > INACTIVITY_LIMIT_MS;
  };

  const getToken = async () => {
    return await AsyncStorage.getItem(ACCESS_KEY);
  };

  const getAgreement = async () => {
    return await AsyncStorage.getItem(AGREEMENT_KEY);
  };

  const actions = useMemo(
    () => ({
      loginStartClear: async () => {
        await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY, USER_KEY, PSW_KEY, LAST_ACTIVE_KEY]);
        setAuthHeader(null);
        setSession({ refresh_token: null, access_token: null, user: '', psw: '' });
      },

      updateAgreement: (agreement) => {
        AsyncStorage.setItem(AGREEMENT_KEY, JSON.stringify(agreement));
        setSession((s) => ({ ...s, agreement_type: agreement }));
      },

      updateRefreshToken: async (token) => {
        if (token) {
          await AsyncStorage.setItem(REFRESH_KEY, token);
        } else {
          await AsyncStorage.removeItem(REFRESH_KEY);
        }
        setSession((s) => ({ ...s, refresh_token: token || null }));
        await bumpLastActive();
      },

      updateAccessToken: async (token, userName = null, userPsw = null) => {
        await AsyncStorage.setItem(ACCESS_KEY, token);
        setAuthHeader(token);

        if (userName !== null) await AsyncStorage.setItem(USER_KEY, userName);
        if (userPsw !== null) await AsyncStorage.setItem(PSW_KEY, userPsw);

        setSession((s) => ({
          ...s,
          access_token: token,
          ...(userName !== null ? { user: userName } : {}),
          ...(userPsw !== null ? { psw: userPsw } : {}),
        }));

        await bumpLastActive();
      },

      logout: async () => {
        await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY, USER_KEY, PSW_KEY, LAST_ACTIVE_KEY]);
        setAuthHeader(null);
        setSession({ refresh_token: null, access_token: null, user: '', psw: '' });
      },

      isAuthenticated: !!session.access_token,
    }),
    [session.access_token]
  );

  useEffect(() => {
    const restoreIfFresh = async () => {
      try {
        const [access, refresh, user, psw, lastActive] = await Promise.all([
          AsyncStorage.getItem(ACCESS_KEY),
          AsyncStorage.getItem(REFRESH_KEY),
          AsyncStorage.getItem(USER_KEY),
          AsyncStorage.getItem(PSW_KEY),
          AsyncStorage.getItem(LAST_ACTIVE_KEY),
        ]);

        if (!access && !refresh) {
          setIsLoading(false);
          return;
        }

        if (isInactiveTooLong(lastActive)) {
          await actions.logout();
          setIsLoading(false);
          return;
        }

        if (access) setAuthHeader(access);
        setSession((prev) => ({
          ...prev,
          access_token: access || null,
          refresh_token: refresh || null,
          user: user || '',
          psw: psw || '',
        }));
        await bumpLastActive();
      } catch (e) {
        console.warn('Session restore failed:', e);
        await actions.logout();
      } finally {
        setIsLoading(false);
      }
    };

    restoreIfFresh();
  }, []);

  useEffect(() => {
    if (respInterceptorIdRef.current !== null) {
      client.interceptors.response.eject(respInterceptorIdRef.current);
      respInterceptorIdRef.current = null;
    }

    const id = client.interceptors.response.use(
      async (response) => {
        if (Object.prototype.hasOwnProperty.call(response.data ?? {}, 'logout')) {
          await actions.logout();
          return response;
        }

        await bumpLastActive();
        return response;
      },
      async (error) => {
        const originalRequest = error.config || {};
        const url = originalRequest.url || '';
        const status = error.response?.status;

        if (error.code === 'ECONNABORTED' || error.code === 'ERR_INTERNET_DISCONNECTED' || status === 408) {
          return Promise.reject(error);
        }

        if (url === '/token/refresh' || url.startsWith('/login')) {
          return Promise.reject(error);
        }

        if (status !== 403) {
          return Promise.reject(error);
        }

        const lastActive = await AsyncStorage.getItem(LAST_ACTIVE_KEY);
        if (isInactiveTooLong(lastActive)) {
          await actions.logout();
          return Promise.reject(error);
        }

        if (originalRequest._retry == null) {
          originalRequest._retry = true;

          try {
            let refresh = session.refresh_token ?? (await AsyncStorage.getItem(REFRESH_KEY));
            if (!refresh) {
              await actions.logout();
              return Promise.reject(error);
            }

            const refreshResp = await API.refreshToken({ Authorization: `Bearer ${refresh}` });
            const newAccess = refreshResp?.access_token;

            if (!newAccess) {
              await actions.logout();
              return Promise.reject(error);
            }

            await actions.updateAccessToken(newAccess); // user/psw bozulmaz
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;

            return axios(originalRequest);
          } catch (e) {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    respInterceptorIdRef.current = id;

    return () => {
      if (respInterceptorIdRef.current !== null) {
        client.interceptors.response.eject(respInterceptorIdRef.current);
        respInterceptorIdRef.current = null;
      }
    };
  }, [session.refresh_token]);

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{
        session,
        actions,
        getToken,
        getAgreement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
