import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './BorderedDateInput.styles';
import {CalendarSvg} from '../../../assets/icons';

const BorderedDateInput = ({label, onPress, value}) => (
  <View>
    {label && <Text style={styles.label}>{label}</Text>}
    <TouchableOpacity style={styles.input} onPress={onPress}>
      <Text value={value}>{value}</Text>
      <CalendarSvg {...styles.icon} />
    </TouchableOpacity>
  </View>
);

export {BorderedDateInput};
