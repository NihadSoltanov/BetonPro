import {useState, useEffect} from 'react';
import API from '../../api/API';
import {useNavigation} from '@react-navigation/native';

const useGraphsData = () => {
  const navigation = useNavigation();
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getGraphsData = () => {
    setIsLoading(true);
    API.getGraphsData()
      .then((resp) => {
        setGraphData(resp);
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
    navigation.addListener('focus', () => {
      getGraphsData();
    });
  }, [navigation]);

  return {graphData, isLoadingGraphData: isLoading, error};
};

export {useGraphsData};
