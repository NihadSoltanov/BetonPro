import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './LinkButton.styles';

const LinkButton = ({onPress, title, Icon, variant}) => (
  <TouchableOpacity onPress={onPress} style={Icon ? styles.iconButton : {}}>
    {Icon && (
      <Icon
        {...styles.icon}
        color={
          variant === 'primary' ? styles.primary.color : styles.secondary.color
        }
      />
    )}
    <Text
      style={[
        styles.label,
        variant === 'primary' ? styles.primary : styles.secondary,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export {LinkButton};
