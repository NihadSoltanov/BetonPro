import {useState, useEffect} from 'react';
import API from '../../api/API';

const useNewOrderPriceEstimate = (params) => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOrderCounts = () => {
      setIsLoading(true);
      API.getPreviewPrice(params)
        .then((resp) => {
          setPrice(resp);
        })
        .catch((e) => {
          setError(e);
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getOrderCounts();
  }, [params]);

  return {price, isLoadingPrice: isLoading, error};
};

export {useNewOrderPriceEstimate};
