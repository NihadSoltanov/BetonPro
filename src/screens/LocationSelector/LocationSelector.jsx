import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import styles from './LocationSelector.styles';
import {
  ProfileButton,
  MapHeader,
  IconButton,
  MapTypeSelector,
} from '../../components';
import {StackSvg} from '../../assets/icons';
import {Marker, ConfirmAddressDrawer} from './components';
import {MAP_TYPES} from './config';
import {useObject} from '../../hooks/data';
import {ROUTES} from '../../routing/routes';

const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;
const INITIAL_LAT = 54.89687;
const INITIAL_LONG = 23.892429;

const LocationSelector = ({navigation, route}) => {
  const [mapSelectorOpen, setMapSelectorOpen] = useState(false);
  const [selectedMarkerAddress, setSelectedMarkerAddress] = useState(undefined);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [newMarker, setNewMarker] = useState(null);

  const {object} = useObject(
    route.params?.selectedObject?.id,
    route.params?.selectedObject?.branchId,
  );

  const [markers, setMarkers] = useState([]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude: INITIAL_LAT,
    longitude: INITIAL_LONG,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef && mapRef.current && selectedMarker) {
      setIsLoadingAddress(true);
      mapRef.current
        .addressForCoordinate(selectedMarker.coordinates)
        .then((address) => {
          setSelectedMarkerAddress(
            `${address.thoroughfare ? `${address.thoroughfare} ` : ''}${
              address.name ?? ''
            } ${address.locality ? `, ${address.locality}` : ''}`,
          );
          setIsLoadingAddress(false);
        })
        .catch(() => {
          setSelectedMarkerAddress(null);
          setIsLoadingAddress(false);
        });
    }
  }, [selectedMarker]);

  useEffect(() => {
    if (route.params?.selectedMarker) {
      const marker = route.params.selectedMarker;
      setSelectedMarker(marker);
      setNewMarker(marker);
    }
    if (route.params?.selectedObject) {
      const {latitude, longitude} = route.params.selectedObject.coordinates;

      setRegion((prev) => ({
        ...prev,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }));
    }
  }, [route]);

  useEffect(() => {
    if (object?.previousOrdersCoordinates) {
      const previousMarkers = object.previousOrdersCoordinates.map(
        (coordinates) => ({
          coordinates: {
            latitude: parseFloat(coordinates.latitude),
            longitude: parseFloat(coordinates.longitude),
          },
          title: coordinates.date,
          id: new Date().valueOf(),
        }),
      );
      setMarkers(previousMarkers);
    }
  }, [object]);

  const handleNewMapLocation = (positionEvent) => {
    const id = new Date().valueOf();
    const coordinates = positionEvent.nativeEvent.coordinate;
    const marker = {
      id,
      coordinates: coordinates,
      title: new Date().toISOString().split('T')[0],
    };

    setSelectedMarker(marker);
    setNewMarker(marker);
  };

  const handleMapTypePress = () => {
    setMapSelectorOpen(true);
  };

  const handleMapTypeChange = (type) => {
    setMapType(type);
    setMapSelectorOpen(false);
  };

  const handleExistingMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setNewMarker(null);
  };

  const handleConfirmAddress = () => {
    navigation.navigate(ROUTES.NEW_ORDER, {
      ...selectedMarker,
      address: selectedMarkerAddress,
    });
  };

  const handleCancelAddress = () => {
    setSelectedMarker(null);
    setNewMarker(null);
  };

  return (
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
          onPress={handleNewMapLocation}
          mapType={mapType}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinates={marker.coordinates}
              active={selectedMarker && selectedMarker.id === marker.id}
              title={marker.title}
              id={marker.id}
              onPress={handleExistingMarkerPress}
            />
          ))}
          {newMarker && (
            <Marker
              key={newMarker.id}
              coordinates={newMarker.coordinates}
              active={selectedMarker && selectedMarker.id === newMarker.id}
              title={newMarker.title}
              id={newMarker.id}
            />
          )}
        </MapView>
        <MapTypeSelector
          active={mapType}
          onChange={handleMapTypeChange}
          isVisible={mapSelectorOpen}
          onClose={() => setMapSelectorOpen(false)}
        />
        <ConfirmAddressDrawer
          onSubmit={handleConfirmAddress}
          isVisible={!!selectedMarker}
          onClose={handleCancelAddress}
          title={selectedMarker?.title}
          address={selectedMarkerAddress}
          isLoading={isLoadingAddress}
        />
      </View>
    </MapHeader>
  );
};

export {LocationSelector};
