import React, {useState, useRef, useEffect} from 'react';
import {View,SafeAreaView} from 'react-native';
import MapView from 'react-native-maps';
import styles from './MapTracking.styles';
import {
  ProfileButton,
  MapHeader,
  IconButton,
  MapTypeSelector,
} from '../../components';
import {CirclesSvg, MarkerSvg, StackSvg} from '../../assets/icons';
import {MAP_TYPES} from './config';
import {Marker, DeliveryMarker} from './components';
import {useOngoingOrder} from '../../hooks/data/useOngoingOrder';

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;
const INITIAL_LAT = 54.89687;
const INITIAL_LONG = 23.892429;

const MapTracking = ({navigation, route}) => {
  const {ongoingOrder} = useOngoingOrder(
    route.params?.orderId,
    route.params?.orderDb,
    true,
    10000,
  );

  const [mapSelectorOpen, setMapSelectorOpen] = useState(false);
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [focusedDelivery, setFocusedDelivery] = useState(null);

  const [region, setRegion] = useState({
    latitude: INITIAL_LAT,
    longitude: INITIAL_LONG,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [factory, setFactory] = useState(null);
  const [destination, setDestination] = useState(null);
  const [deliveries, setDeliveries] = useState(null);

useEffect(() => {
  const p = route?.params || {};

  // region güvenli parse
  const lat = Number(p?.region?.latitude ?? p?.region?.lat);
  const lng = Number(p?.region?.longitude ?? p?.region?.lng ?? p?.region?.lon);
  const ok = Number.isFinite(lat) && Number.isFinite(lng);

  if (ok) {
    setRegion(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  } // Geçersizse hiç dokunmuyoruz (mevcut region aynen kalır)

  if (p?.factory)     setFactory(p.factory);
  if (p?.destination) setDestination(p.destination);
  if (p?.deliveries)  setDeliveries(p.deliveries);
}, [route]);



  useEffect(() => {
    if (ongoingOrder?.mapData?.deliveries)
      setDeliveries(ongoingOrder.mapData.deliveries);
  }, [ongoingOrder]);

  const mapRef = useRef(null);

  const handleMapTypePress = () => {
    setMapSelectorOpen(true);
  };

  const handleMapTypeChange = (type) => {
    setMapType(type);
    setMapSelectorOpen(false);
  };

  const handleFocusDelivery = (id) => {
    if (focusedDelivery === id) setFocusedDelivery(null);
    else setFocusedDelivery(id);
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <MapHeader
      onBackPress={() => navigation.goBack()}
      menuItem={
        <ProfileButton onPress={() => navigation.navigate('Profile')} />
      }
    >
      <View style={styles.container}>
        <View style={styles.mapTypeButton}>
          <IconButton Icon={StackSvg} onPress={handleMapTypePress} />
        </View>
        <MapView
          style={styles.map}
          region={region}
          ref={mapRef}
          mapType={mapType}
          onPress={() => setFocusedDelivery(null)}
        >
          {deliveries?.map((delivery) => (
            <DeliveryMarker
              key={delivery.id}
              coordinates={delivery}
              id={delivery.id}
              licensePlate={delivery.licensePlate}
              status={delivery.status}
              onPress={handleFocusDelivery}
              focused={focusedDelivery === delivery.id}
              amount={delivery.amount}
              estimateArrival={delivery.estimateArrival}
              subTitle={delivery.subTitle}
            />
          ))}
          {factory && (
            <Marker
              coordinates={factory}
              title={factory.name}
              Icon={CirclesSvg}
            />
          )}
          {destination && (
            <Marker
              coordinates={destination}
              title={destination.name}
              Icon={MarkerSvg}
            />
          )}
        </MapView>
        <MapTypeSelector
          active={mapType}
          onChange={handleMapTypeChange}
          isVisible={mapSelectorOpen}
          onClose={() => setMapSelectorOpen(false)}
        />
      </View>
    </MapHeader>
    </SafeAreaView>
  );
};

export {MapTracking};
