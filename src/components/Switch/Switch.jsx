import React from 'react';
import {View, Switch} from 'react-native';
import styles from './Switch.styles';
import {COLORS} from '../../styles/theme';

const CustomSwitch = ({onChange, value, disabled}) => (
  <View style={styles.container}>
    <Switch
      trackColor={{false: COLORS.lightGrey, true: COLORS.primary}}
      thumbColor={value ? COLORS.white : COLORS.primary}
      onValueChange={onChange}
      value={value}
      style={{
        transform: [{scaleX: 1.4}, {scaleY: 1.4}],
        opacity: disabled ? 0.4 : 1,
      }}
      disabled={disabled}
    />
  </View>
);

export {CustomSwitch};
