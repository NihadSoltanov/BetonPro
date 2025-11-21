import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './HighlightText.styles';

const HighlightText = ({text, placeholder, onPress, disabled}) => {
  let textElement = null;

  if (!text)
    textElement = <Text style={styles.placeholderText}>{placeholder}</Text>;
  else textElement = <Text style={styles.highligtedText}>{text}</Text>;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}
      disabled={disabled}
    >
      {textElement}
    </TouchableOpacity>
  );
};

export {HighlightText};
