import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './IconButton.styles';

const IconButton = ({onPress, Icon, iconStyles, text, buttonStyles}) => {
  let iconStyle = {...styles.icon};
  if (iconStyles) iconStyle = {...iconStyle, ...iconStyles};

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyles]}>
      <Icon {...iconStyle} />
      {text && (
        <Text
          style={[
            styles.text,
            iconStyle && iconStyle.color && {color: iconStyle.color},
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export {IconButton};
