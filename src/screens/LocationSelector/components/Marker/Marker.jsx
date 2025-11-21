import React from 'react';
import {View, Text} from 'react-native';
import {Marker} from 'react-native-maps';
import {MarkerSvg} from '../../../../assets/icons';
import styles from './Marker.styles';

const CustomMarker = ({coordinates, active, title, onPress, id}) => {
  const iconStyles = active ? styles.markerIconActive : styles.markerIcon;
  return (
    <Marker
      coordinate={coordinates}
      onPress={(e) => {
        onPress &&
          onPress({
            coordinates: e.nativeEvent.coordinate,
            id: id,
            title: title,
          });
      }}
      anchor={{x: 0, y: 1}}
    >
      <View
        style={[
          styles.markerContainerBase,
          active ? styles.markerContainerActive : styles.markerContainer,
        ]}
      >
        <View
          style={[
            styles.markerIconContainerBase,
            active
              ? styles.markerIconContainerActive
              : styles.markerIconContainer,
          ]}
        >
          <MarkerSvg {...iconStyles} />
        </View>
        {title && (
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.textBase,
                active ? styles.textActive : styles.text,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </Marker>
  );
};

export {CustomMarker};
