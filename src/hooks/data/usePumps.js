import {useState, useEffect} from 'react';
import API from '../../api/API';

const usePumps = () => {
  const [pumps, setPumps] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPumps = () => {
    setIsLoading(true);
    API.getMixturesAndPumps()
      .then((resp) => {
        setPumps(resp.pumps);
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
    getPumps();
  }, []);

  return {pumps, isLoadingpumps: isLoading, error};
};

export {usePumps};
