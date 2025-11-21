import {useState} from 'react';
import API from '../../api/API';

const useCancelOrder = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cancelOrder = (params, callback) => {
    API.cancelOrder(params)
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

  return {cancelOrder, isLoadingOrder: isLoading, error};
};

export {useCancelOrder};
