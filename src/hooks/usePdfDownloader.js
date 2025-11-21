import {useState, useEffect} from 'react';
import {getBaseUrl, getUserName, getUserPsw} from '../util/TokenUtil';
import {downloadFile} from '../util/FileSystemUtils';

const usePdfDownloader = () => {
  const [userName, setUserName] = useState(null);
  const [userPsw, setUserPsw] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await getUserName();
      const psw = await getUserPsw();
      setUserName(user);
      setUserPsw(psw);
    }
    fetchData();
  }, []);

  const pdfDownloader = async (deliveryId, db) => {
    try {
      const response = getBaseUrl()+'/send_vazt&t_id=' +
        deliveryId +
        '&db=' +
        db +
        '&user=' +
        userName +
        '&psw=' +
        userPsw;

      let pdfUrl = response;
      downloadFile(pdfUrl);
    } catch (error) {
      // TODO: Handle error
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return pdfDownloader;
};

export {usePdfDownloader};
