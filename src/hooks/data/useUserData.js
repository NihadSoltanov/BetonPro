import {useState, useEffect} from 'react';
import API from '../../api/API';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = () => {
    setIsLoading(true);
    API.getUserData()
      .then((resp) => {
        setUserData(resp);
      })
      .catch((e) => {
        setError(e);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return {userData, isLoadingUserData: isLoading, error};
};

export {useUserData};
