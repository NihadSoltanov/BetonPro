import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from '../../styles/theme';

const Loader = ({size, color}) => (
  <ActivityIndicator
    size={size ?? 'small'}
    color={color ? color : COLORS.primary}
  />
);

export {Loader};
