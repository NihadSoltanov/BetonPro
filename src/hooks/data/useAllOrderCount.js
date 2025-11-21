import {useState, useEffect} from 'react';
import API from '../../api/API';

const useAllOrderCount = (navigation) => {
  const [orderCounts, setOrderCounts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getOrderCounts = () => {
    setIsLoading(true);
    API.getOrderCounts()
      .then((resp) => {
        setOrderCounts(resp);
        console.log(orderCounts);
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
    getOrderCounts();
    navigation.addListener('focus', () => {
      getOrderCounts();
    });
  }, [navigation]);

  return {orderCounts, isLoadingOrderCounts: isLoading, error};
};

export {useAllOrderCount};
