import React from 'react';
import {View, Text} from 'react-native';
import {Marker} from 'react-native-maps';
import styles from './Marker.styles';

const CustomMarker = ({coordinates, title, Icon}) => {
  return (
    <Marker coordinate={coordinates} anchor={{x: 0, y: 1}}>
      <View style={styles.markerContainer}>
        <View style={styles.markerIconContainer}>
          <Icon {...styles.markerIcon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </Marker>
  );
};

export {CustomMarker};
