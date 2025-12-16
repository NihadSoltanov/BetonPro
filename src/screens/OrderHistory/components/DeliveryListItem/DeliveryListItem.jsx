import {View, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import styles from './DeliveryListItem.styles';
import {IconButton, SigningPill} from '../../../../components';
import {DotsSvg, CarSvg, PumpCarSvg} from '../../../../assets/icons';
import {formatOrderQuantity} from '../../../../util/DisplayFormatterUtils';

const hasAnyMeasurement = (plant, onSite) => {
  const values = [
    plant?.temperature,
    plant?.slump,
    onSite?.temperature,
    onSite?.slump,
  ];

  return values.some(v => Number(v) > 0);
};

const DeliveryListItem = ({item, onPress}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.rootContainer}>

      {/* HEADER */}
      <View style={styles.container}>
        <View style={styles.dataRow}>
          <View>
            {item.isCarWithPump ? <PumpCarSvg /> : <CarSvg />}
          </View>

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

      {/* SIGN */}
      <View style={styles.dataRow}>
        <SigningPill signed={item.signed} />
      </View>

      {/* 📊 MEASUREMENTS */}
      {hasAnyMeasurement(item.plant, item.onSite) && (
        <View style={[styles.dataRow, {paddingLeft: 34, marginTop: 6}]}>

          <Text style={styles.measureText}>
            {t('order_history_form.delivery_item.at_plant')} •
            {t('order_history_form.delivery_item.temperature')}: {item.plant?.temperature ?? 0} •
            {t('order_history_form.delivery_item.slump')}: {item.plant?.slump ?? 0}
          </Text>

          <Text style={styles.measureText}>
            {t('order_history_form.delivery_item.on_site')} •
            {t('order_history_form.delivery_item.temperature')}: {item.onSite?.temperature ?? 0} •
            {t('order_history_form.delivery_item.slump')}: {item.onSite?.slump ?? 0}
          </Text>

        </View>
      )}

      {/* TIMES */}
      {item.deliveryStart && item.deliveryEnd && (
        <View style={[styles.dataRow, {paddingLeft: 34}]}>
          <Text style={styles.subText}>{item.deliveryStart}</Text>
          <Text style={styles.smallSeparator}>•</Text>
          <Text style={styles.subText}>{item.deliveryEnd}</Text>

          {item.unloadingEnd && (
            <>
              <Text style={styles.smallSeparator}>•</Text>
              <Text style={styles.subText}>{item.unloadingEnd}</Text>
            </>
          )}
        </View>
      )}

    </View>
  );
};

export {DeliveryListItem};
