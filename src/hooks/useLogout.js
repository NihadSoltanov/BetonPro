import {useState, useContext, useEffect} from 'react';
import API from '../api/API';
import {clearSession} from '../util/TokenUtil';
import {AuthContext} from '../context/AuthProvider';
import { getLogoutUrl } from '../util/TokenUtil';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logOutURL, setLogOutURL] = useState(null);
  const {actions} = useContext(AuthContext);

  useEffect(() => {
    const fetchLogoutUrl = async () => {
      const url = await getLogoutUrl();
      setLogOutURL(url);
    };

    fetchLogoutUrl();
  }, []);

  const logout = () => {
    setIsLoading(true);
    if (!logOutURL) return;

    API.logout(logOutURL).then(() => {
      clearSession().then(() => {
        setIsLoading(false);
        actions.logout();
      });
    });
  };

  return {logout, isLoading};
};

export {useLogout};
