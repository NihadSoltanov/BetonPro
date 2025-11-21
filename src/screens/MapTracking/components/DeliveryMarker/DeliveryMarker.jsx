import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Callout, Marker as RNMarker } from 'react-native-maps';
import { CarSvg } from '../../../../assets/icons';
import styles from './DeliveryMarker.styles';
import { DELIVERY_COLORS_BY_STATUS } from '../../../../styles/theme';
import { formatOrderQuantity } from '../../../../util/DisplayFormatterUtils';

const DeliveryMarker = ({
  coordinates,
  status,
  focused,
  onPress,
  licensePlate,
  amount,
  estimateArrival,
  subTitle,
  id,
}) => {
  const calloutMarkerRef = useRef(null);
  const [isCalloutVisible, setIsCalloutVisible] = useState(false);

  const handlePress = () => {
    setIsCalloutVisible(true);
    onPress && onPress(id);
    setTimeout(() => {
      setIsCalloutVisible(false);
    }, 10000);
  };

  useEffect(() => {
    if (focused) {
      setIsCalloutVisible(true);
      const timer = setTimeout(() => {
        setIsCalloutVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [focused]);

  const latRaw = coordinates?.latitude ?? coordinates?.lat;
  const lngRaw = coordinates?.longitude ?? coordinates?.lng ?? coordinates?.lon;

  const latitude = Number(latRaw);
  const longitude = Number(lngRaw);
  const isValid = Number.isFinite(latitude) && Number.isFinite(longitude);

  if (!isValid) {
    return null;
  }

  const markerCoord = { latitude, longitude };

  return (
    <>
      <RNMarker
        coordinate={markerCoord}
        anchor={{ x: 0, y: 1 }}
        onPress={handlePress}
        tracksViewChanges={false}
      >
        <View
          style={[
            styles.markerIconContainer,
            {
              backgroundColor: focused
                ? styles.markerIcon.color
                : DELIVERY_COLORS_BY_STATUS[status],
            },
          ]}
        >
          <CarSvg
            {...styles.markerIcon}
            color={
              focused
                ? DELIVERY_COLORS_BY_STATUS[status]
                : styles.markerIcon.color
            }
          />
        </View>
      </RNMarker>

      {isCalloutVisible && (
        <RNMarker
          coordinate={markerCoord}
          anchor={{ x: 0, y: 1 }}
          ref={calloutMarkerRef}
          opacity={0}
        >
          <Callout tooltip style={{ position: 'relative' }}>
            <View
              style={[styles.tooltip, estimateArrival && styles.adjustedPadding]}
            >
              {estimateArrival && (
                <View style={styles.estimateArrival}>
                  <Text style={styles.estimateArrivalTextBold}>
                    {estimateArrival}
                  </Text>
                  <Text style={styles.estimateArrivalText}>min.</Text>
                </View>
              )}
              <View>
                <View style={styles.tooltipHeader}>
                  <Text style={styles.tooltipBoldText}>{licensePlate}</Text>
                  <Text style={styles.tooltipText}>•</Text>
                  <Text style={styles.tooltipText}>
                    {formatOrderQuantity(amount)}
                  </Text>
                </View>
                <Text style={styles.tooltipText}>{subTitle}</Text>
              </View>
            </View>
          </Callout>
        </RNMarker>
      )}
    </>
  );
};

export { DeliveryMarker };
