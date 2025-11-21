import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './Button.styles';
import {Loader} from '../../Loader/Loader';

const Button = ({
  onPress,
  label,
  disabled,
  variant,
  loading,
  Icon,
  textStyle,
  buttonStyle,
}) => {
  const getStyle = () => {
    if (variant === 'danger') {
      if (disabled) return styles.buttonSolidDangerDisabled;

      return styles.buttonDanger;
    }
    if (variant === 'solid') {
      if (disabled) return styles.buttonSolidDisabled;

      return styles.buttonSolid;
    }
    if (variant === 'outlined') {
      if (disabled) return styles.buttonOutlinedDisabled;

      return styles.buttonOutlined;
    }

    return undefined;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonBase,
        getStyle(),
        Icon && !loading && styles.iconButton,
        buttonStyle && buttonStyle,
      ]}
      disabled={disabled}
    >
      {!loading && Icon && <Icon {...styles.icon} />}
      {!loading && (
        <Text
          style={[
            styles.label,
            textStyle && textStyle,
            variant === 'danger' && styles.textDanger,
          ]}
        >
          {label}
        </Text>
      )}
      {loading && <Loader />}
    </TouchableOpacity>
  );
};

export {Button};
