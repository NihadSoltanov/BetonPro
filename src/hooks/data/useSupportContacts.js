import {useState, useEffect} from 'react';
import API from '../../api/API';

const useSupportContacts = () => {
  const [supportContacts, setSupportContacts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSupportContacts = () => {
    setIsLoading(true);
    API.getSupportContacts()
      .then((resp) => {
        setSupportContacts(resp);
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
    getSupportContacts();
  }, []);

  return {supportContacts, isLoadingSupportContacts: isLoading, error};
};

export {useSupportContacts};
