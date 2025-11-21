import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../api/config';

export const getAccessToken = async () =>
  await AsyncStorage.getItem('access_token');
export const getUserName = async () => await AsyncStorage.getItem('user');
export const getUserPsw = async () => await AsyncStorage.getItem('psw');
export const getUserEmail = async () => await AsyncStorage.getItem('user_email');

export const getRefreshToken = () => AsyncStorage.getItem('refresh_token');
export const isAuthenticated = () => !!getAccessToken();
export const clearSession = async () =>
  await AsyncStorage.multiRemove([
    'user',
    'psw',
    'refresh_token',
    'access_token',
  ]);

/**
 * Base URL seçimi
 */
export const getBaseUrl = async () => {
  const selectRegion = await AsyncStorage.getItem("base_url");
  console.log("🟢 [getBaseUrl] Selected region:", selectRegion);

  if (selectRegion) {
    if (selectRegion === "Latvia") {
      return ENDPOINTS.API_URL_LV;
    } else if (selectRegion === "Lithuania") {
      return ENDPOINTS.API_URL_LT;
    } else if (selectRegion === "Croatia") {
      return ENDPOINTS.API_URL_CR;
    } else if (selectRegion === "HMobile") {
      return ENDPOINTS.API_URL_HMOBILE;
    }
  }

  return ENDPOINTS.ROOT;
};

/**
 * Support contact URL
 */
export const getContactUrl = async () => {
  const selectRegion = await AsyncStorage.getItem("base_url");

  if (selectRegion) {
    if (selectRegion === "Latvia") {
      return ENDPOINTS.SUPPORT_CONTACTS_LV;
    } else if (selectRegion === "Lithuania") {
      return ENDPOINTS.SUPPORT_CONTACTS_LT;
    } else if (selectRegion === "Croatia") {
      return ENDPOINTS.SUPPORT_CONTACTS_CR;
    } else if (selectRegion === "HMobile") {
      return ENDPOINTS.SUPPORT_CONTACTS_LT; // 🔹 İstersen ayrı HMobile endpoint de eklenebilir
    }
  }

  return ENDPOINTS.SUPPORT_CONTACTS_LT;
};

/**
 * Logout URL
 */
export const getLogoutUrl = async () => {
  const selectRegion = await AsyncStorage.getItem("base_url");

  if (selectRegion) {
    if (selectRegion === "Latvia") {
      return ENDPOINTS.LOGOUT_LV;
    } else if (selectRegion === "Lithuania") {
      return ENDPOINTS.LOGOUT_LT;
    } else if (selectRegion === "Croatia") {
      return ENDPOINTS.LOGOUT_CR;
    } else if (selectRegion === "HMobile") {
      return ENDPOINTS.LOGOUT_LT; // 🔹 İstersen HMobile için özel logout URL de tanımlayabiliriz
    }
  }

  return ENDPOINTS.LOGOUT_LT;
};
