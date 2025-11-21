import {View, Text} from 'react-native';
import React from 'react';
import styles from './DeliveryListItem.styles';
import {IconButton, SigningPill} from '../../../../components';
import {DotsSvg, CarSvg, PumpCarSvg} from '../../../../assets/icons';
import {formatOrderQuantity} from '../../../../util/DisplayFormatterUtils';

const DeliveryListItem = ({item, onPress}) => (
  <View style={styles.rootContainer}>
    <View style={styles.container}>
      <View style={styles.dataRow}>
        <View>{item.isCarWithPump ? <PumpCarSvg /> : <CarSvg />}</View>
        <Text style={styles.boldText}>{item.licensePlate}</Text>
        <Text style={styles.seperator}>•</Text>
        <Text style={styles.regularText}>
          {formatOrderQuantity(item.quantity)}
        </Text>
      </View>
      <IconButton
        Icon={DotsSvg}
        onPress={onPress}
        buttonStyles={{padding: 0}}
      />
    </View>
    <View style={[styles.dataRow]}>
      <SigningPill signed={item.signed} />
    </View>
    {item.deliveryStart && item.deliveryEnd && (
      <View style={[styles.dataRow, {paddingLeft: 34}]}>
        {item.deliveryStart && (
          <Text style={styles.subText}>{item.deliveryStart}</Text>
        )}
        {item.deliveryStart && item.deliveryEnd && (
          <Text style={styles.smallSeparator}>•</Text>
        )}
        {item.deliveryEnd && (
          <Text style={styles.subText}>{item.deliveryEnd}</Text>
        )}
        {item.deliveryEnd && item.unloadingEnd && (
          <Text style={styles.smallSeparator}>•</Text>
        )}
        {item.unloadingEnd && (
          <Text style={styles.subText}>{item.unloadingEnd}</Text>
        )}
      </View>
    )}
  </View>
);

export {DeliveryListItem};
