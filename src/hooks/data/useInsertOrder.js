import {useState} from 'react';
import API from '../../api/API';

const useInsertOrder = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const insertOrder = (params, callback) => {
    API.insertOrder(params)
      .then(() => {
        callback();
      })
      .catch((e) => {
        setError(e);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {insertOrder, isLoadingOrder: isLoading, error};
};

export {useInsertOrder};
