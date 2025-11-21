import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import styles from './MapTypeButton.styles';

const MapTypeButton = ({active, imageUrl, text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        style={[styles.buttonImage, active ? styles.activeImage : {}]}
        source={imageUrl}
      />
      <Text style={[styles.buttonText, active ? styles.activeText : {}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export {MapTypeButton};
