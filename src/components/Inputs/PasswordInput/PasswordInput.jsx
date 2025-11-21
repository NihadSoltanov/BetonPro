// components/Inputs/PasswordInput/PasswordInput.jsx
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { CustomTextInput } from '../TextInput/TextInput';

const Eye = ({ size = 22, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeOff = ({ size = 22, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3l18 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path
      d="M6.2 6.2C3.9 7.9 2.4 10 2.4 10s4 7 9.6 7c2.2 0 4.1-.6 5.8-1.6M9.8 5.1A10.8 10.8 0 0 1 12 5c5.6 0 9.6 7 9.6 7a15.7 15.7 0 0 1-2.2 2.9"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PasswordInput = ({ label, value, onValueChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  return (
    <View style={{ position: 'relative' }}>
      <CustomTextInput
        label={label}
        value={value}
        onValueChange={onValueChange}
        secureTextEntry={isPasswordVisible}
        style={{ paddingRight: 40 }}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
      />

      <TouchableOpacity
        onPress={() => setIsPasswordVisible(prev => !prev)}
        accessibilityRole="button"
        accessibilityLabel={isPasswordVisible ? 'Show password' : 'Hide password'}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: [{ translateY: -12 }],
        }}
      >
        {isPasswordVisible ? <Eye /> : <EyeOff />}
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
