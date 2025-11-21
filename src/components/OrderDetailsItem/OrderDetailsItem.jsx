import React from 'react';
import {Text, View} from 'react-native';
import styles from './OrderDetailsItem.styles';

function OrderDetailsItem({header, text}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

export {OrderDetailsItem};
