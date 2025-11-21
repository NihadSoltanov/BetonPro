import React from 'react';
import {View, Text} from 'react-native';
import styles from './Pill.styles';

const Pill = ({text, color}) => {
  return (
    <View style={[styles.container, color && {backgroundColor: color}]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export {Pill};
