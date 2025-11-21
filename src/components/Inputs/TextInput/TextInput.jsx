import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './TextInput.styles';

const CustomTextInput = ({
  label,
  onValueChange,
  value,
  secureTextEntry,
  disabled,
  keyboardType,
  placeholder,
  style,
}) => (
  <View>
    {label && (
      <Text style={[styles.label, disabled ? styles.disabled : {}]}>
        {label}
      </Text>
    )}
    <TextInput
      style={[styles.input, disabled ? styles.disabled : {}, style && style]}
      value={value}
      onChangeText={onValueChange}
      secureTextEntry={secureTextEntry ?? false}
      editable={!disabled}
      keyboardType={keyboardType ?? 'default'}
      placeholder={placeholder}
    />
  </View>
);

export {CustomTextInput};
