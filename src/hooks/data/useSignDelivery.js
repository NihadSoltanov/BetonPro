import {useState} from 'react';
import API from '../../api/API';

const useSignDelivery = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signDelivery = (params, callback) => {
    setIsLoading(true);
    API.signDelivery(params)
      .then(() => {
        callback(params.id);
      })
      .catch((e) => {
        setError(e);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {signDelivery, isLoading, error};
};

export {useSignDelivery};
