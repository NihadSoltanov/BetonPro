import React from 'react';
import {View, Text} from 'react-native';
import styles from './OrderInputLayout.styles';

const OrderInputLayout = ({children, Icon, title, error, style}) => (
  <View
    style={[styles.container, error ? styles.error : {}, style ? style : {}]}
  >
    <View style={styles.subContainer}>
      <View style={styles.titleContainer}>
        {Icon && (
          <Icon
            {...styles.icon}
            color={error ? styles.errorText.color : styles.icon.color}
          />
        )}
        <Text style={[styles.title, error ? styles.errorText : {}]}>
          {title}
        </Text>
      </View>
      {children}
    </View>
    {error && <Text style={styles.errorMessage}>{error}</Text>}
  </View>
);

export {OrderInputLayout};
