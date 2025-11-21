import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './FilterButton.styles';
import {SettingsSvg} from '../../../assets/icons';

const FilterButton = ({onPress, color}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, color && {backgroundColor: color}]}
    >
      <SettingsSvg {...styles.icon} />
      <Text style={styles.text}>Filtras</Text>
    </TouchableOpacity>
  );
};

export {FilterButton};
