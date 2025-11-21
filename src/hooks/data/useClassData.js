import {useState, useEffect} from 'react';
import API from '../../api/API';

const useClassData= () => {
  const [classData, setClassData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getClassData = () => {
    setIsLoading(true);
    API.getClassessData()
      .then((resp) => {
        setClassData(resp);
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
    getClassData();
  }, []);

  return {classData, isLoadingClassess: isLoading, error};
};

export {useClassData};
