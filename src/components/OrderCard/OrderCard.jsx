import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './OrderCard.styles';
import {Box} from '../Box/Box';
import {
  formatCashValue,
  formatOrderQuantity,
  formatDisplayDate,
} from '../../util/DisplayFormatterUtils';
import { useTranslate } from '../../hooks/useTranslate';

const OrderCard = ({
  item,
  onPress,
  isOpen,
  header,
  children,
  additionalInfo,
  displayOrdered
}) => {
  const { t} = useTranslate();
  return (
    <TouchableOpacity onPress={onPress}>
      <Box>
        <View style={styles.orderHeader}>
          <Text style={styles.orderIdText}>#{item.id}</Text>
          {header && header}
        </View>
        <View style={styles.orderSubHeader}>
          <View flex={1}>
            <Text style={styles.orderSubText}>{item.address}</Text>
          </View>
          <View>
            <Text style={styles.orderPriceText}>
              {formatOrderQuantity(item.quantity)}
            </Text>
            <Text style={styles.orderPriceText}>
              {item.price ? formatCashValue(item.price) : ''}
            </Text>
          </View>
        </View>
        <View style={styles.orderSubHeaderDetails}>
          <Text style={styles.orderSubHeaderDetailsText}>
            {item.date && formatDisplayDate(new Date(item.date))}
          </Text>
          {item.startTime && (
            <Text style={styles.orderSubHeaderDetailsText}>
              {item.startTime}
            </Text>
          )}
          {item.startTime && item.endTime && (
            <Text style={styles.orderSubHeaderDetailsText}>•</Text>
          )}
          {item.endTime && (
            <Text style={styles.orderSubHeaderDetailsText}>{item.endTime}</Text>
          )}
        </View>
        <View style={styles.orderSubHeaderDetails}>
          <Text style={styles.orderSubHeaderDetailsText}>{t('components.order_card.for')}:</Text>
          <Text style={styles.orderSubHeaderDetailsText}>{item.orderedBy}</Text>
        </View>
        <View
          style={[
            styles.orderSubHeaderDetails,
            isOpen && !additionalInfo && styles.orderSubHeaderDetailsOpen,
          ]}
        >
          <Text style={styles.orderSubHeaderDetailsText}>{t('components.order_card.manager')}:</Text>
          <Text style={styles.orderSubHeaderDetailsText}>
            {item.salesPerson}
          </Text>
        </View>
        {displayOrdered && (
         <View style={{flexDirection:'row'}}>
            <Text style={styles.orderSubHeaderDetailsText}>
            {t('components.order_card.delivered')}: {parseFloat(item.deliveredQuantity).toFixed(2)}
            </Text>
            <Text style={styles.orderSubHeaderDetailsText}>
              /{formatOrderQuantity(item.orderQuantity)}
            </Text>
        </View>
        )

        }
        {!isOpen && additionalInfo && (
          <View style={[isOpen && styles.orderSubHeaderDetailsOpen]}>
            {additionalInfo}
          </View>
        )}
        {isOpen && <>{children}</>}
      </Box>
    </TouchableOpacity>
  );
};

export {OrderCard};
