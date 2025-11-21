import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './TextArea.styles';

const TextArea = ({
  label,
  onValueChange,
  value,
  secure,
  disabled,
  keyboardType,
}) => (
  <View>
    {label && (
      <Text style={[styles.label, disabled ? styles.disabled : {}]}>
        {label}
      </Text>
    )}
    <TextInput
      style={[styles.input, disabled ? styles.disabled : {}]}
      value={value}
      onChangeText={onValueChange}
      secureTextEntry={secure ?? false}
      editable={!disabled}
      keyboardType={keyboardType ?? 'default'}
      multiline={true}
      numberOfLines={2}
    />
  </View>
);

export {TextArea};
