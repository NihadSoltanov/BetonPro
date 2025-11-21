import React from 'react';
import {View} from 'react-native';
import styles from './Box.styles';

const Box = ({children, noPadding, style}) => (
  <View
    style={[
      styles.box,
      noPadding ? styles.withoutPadding : {},
      style ? style : {},
    ]}
  >
    {children}
  </View>
);

export {Box};
