import {useState, useEffect} from 'react';
import API from '../../api/API';

const useObject = (objectId, branchId) => {
  const [object, setObject] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getObject = () => {
      setIsLoading(true);
      API.getObject(branchId, objectId)
        .then((resp) => {
          setObject(resp);
        })
        .catch((e) => {
          setError(e);
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getObject();
  }, [objectId, branchId]);

  return {object, isLoadingObject: isLoading, error};
};

export {useObject};
