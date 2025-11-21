import {useState, useEffect} from 'react';
import API from '../../api/API';
import {useNavigation} from '@react-navigation/native';

const useOngoingOrder = (objectId, dbId, enabled, refreshRate = 60000) => {
  const [ongoingOrder, setOngoingOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const getOngoingOrder = (initial) => {
    if (initial) setIsLoading(true);
    if (!objectId || !dbId) return;

    if (!isLoading)
      API.getOngoingOrder(objectId, dbId)
        .then((resp) => {
          setOngoingOrder(resp);
        })
        .catch((e) => {
          setError(e);
          console.log(e);
        })
        .finally(() => {
          initial = false;
          setIsLoading(false);
        });
  };

  useEffect(() => {
    let interval = null;
    let initial = true;

    const blurListener = navigation.addListener('blur', () => {
      clearInterval(interval);
      interval = null;
    });

    const focusListener = navigation.addListener('focus', () => {
      if (enabled && !interval)
        interval = setInterval(() => getOngoingOrder(initial), refreshRate);
    });

    if (!enabled) clearInterval(interval);
    if (enabled && !interval) {
      getOngoingOrder();
      interval = setInterval(() => getOngoingOrder(initial), refreshRate);
    }

    return () => {
      clearInterval(interval);
      navigation.removeListener(blurListener);
      navigation.removeListener(focusListener);
    };
  }, [objectId, dbId, enabled, navigation, refreshRate]);

  return {ongoingOrder, isLoadingOrder: isLoading, error, getOngoingOrder};
};

export {useOngoingOrder};
