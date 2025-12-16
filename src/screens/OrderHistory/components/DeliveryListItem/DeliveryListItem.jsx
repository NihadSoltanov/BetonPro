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
const hasValidMeasurement = (data) => {
  if (!data) return false;

  const temp = Number(data.temperature);
  const slump = Number(data.slump);

  return temp > 0 || slump > 0;
};

const DeliveryListItem = ({item, onPress}) => {
  const {t} = useTranslation();
  const showPlant = hasValidMeasurement(item.plant);
  const showOnSite = hasValidMeasurement(item.onSite);
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
         {(showPlant || showOnSite) && (
           <View style={styles.measurementsContainer}>
             <View style={styles.measurementsRow}>

               {showPlant && (
                 <View style={styles.measurementsBlock}>
                   <Text style={styles.measurementsTitle}>
                     {t('order_history_form.delivery_item.at_plant')}
                   </Text>
                   <Text style={styles.measurementsText}>
                     {t('order_history_form.delivery_item.temperature')}: {item.plant?.temperature}
                   </Text>
                   <Text style={styles.measurementsText}>
                     {t('order_history_form.delivery_item.slump')}: {item.plant?.slump}
                   </Text>
                 </View>
               )}

               {showOnSite && (
                 <View style={styles.measurementsBlock}>
                   <Text style={styles.measurementsTitle}>
                     {t('order_history_form.delivery_item.on_site')}
                   </Text>
                   <Text style={styles.measurementsText}>
                     {t('order_history_form.delivery_item.temperature')}: {item.onSite?.temperature}
                   </Text>
                   <Text style={styles.measurementsText}>
                     {t('order_history_form.delivery_item.slump')}: {item.onSite?.slump}
                   </Text>
                 </View>
               )}

             </View>
           </View>
         )}

     <View style={styles.deliveryDivider} />


    </View>
  );
};

export {DeliveryListItem};
