import {useState, useEffect} from 'react';
import API from '../../api/API';

const useCoworkers = () => {
  const [coworkers, setCoworkers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCoworkers = () => {
    setIsLoading(true);
    API.getCoworkers()
      .then((resp) => {
        setCoworkers(resp);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCoworkers();
  }, []);

  return {coworkers, isLoadingCoworkers: isLoading, error};
};

export {useCoworkers};
