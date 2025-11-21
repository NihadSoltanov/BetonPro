import React from 'react';
import {View, Text} from 'react-native';
import styles from './AmountInput.styles';
import {TextInput} from '../../../../components/Inputs';

const AmountInput = ({measurement, value, onChange, disabled}) => (
  <View style={[styles.container, disabled && styles.disabled]}>
    <TextInput
      keyboardType="numeric"
      value={value}
      onValueChange={(val) => onChange(val)}
      disabled={disabled}
      style={{marginBottom: 0}}
    />
    <Text style={styles.measurementUnitText}>{measurement}</Text>
  </View>
);

export {AmountInput};
