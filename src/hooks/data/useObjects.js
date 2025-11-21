import {useState, useEffect} from 'react';
import API from '../../api/API';

const useObjects = (coworker) => {
  const [objects, setObjects] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 const getObjects = () => {
   setIsLoading(true);
   API.getObjects(coworker)
     .then((resp) => {
       setObjects(resp);
     })
     .catch((e) => {
       setError(e);
     })
     .finally(() => {
       setIsLoading(false);
     });
 };


useEffect(() => {
  if (!coworker) {
    console.log("coworker boş, API çağrısı yapılmadı");
    return;
  }

  console.log("useObjects çağrılıyor, coworker:", coworker);
  getObjects();
}, [coworker]);


  return {objects, isLoadingObjects: isLoading, error};
};

export {useObjects};
