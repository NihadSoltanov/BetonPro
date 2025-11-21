import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ProductLabel.styles';
import {ProductSvg} from '../../../../assets/icons';

const ProductLabel = ({
  title,
  subText,
  onPress,
  placeholder,
  disabled,
  withIcon,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    disabled={disabled}
  >
    {withIcon && (
      <View>
        <ProductSvg {...styles.icon} />
      </View>
    )}
    <View
      style={[
        styles.subContainer,
        withIcon && {justifyContent: 'flex-start'},
        disabled && styles.disabled,
      ]}
      onPress={onPress}
    >
      <View>
        {!title && <Text style={styles.placeholderText}>{placeholder}</Text>}
        {title && <Text style={styles.titleText}>{title}</Text>}
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>
    </View>
  </TouchableOpacity>
);

export {ProductLabel};
