import React from 'react';
import {Box} from '../Box/Box';
import {View, Text} from 'react-native';
import styles from './NoOrders.styles';
import { useTranslate } from '../../hooks/useTranslate';

const NoOrders = ({isFiltered, defaultText}) => {
  const { t} = useTranslate();
  return (
    <Box>
      <View style={styles.orderSubHeader}>
        <View>
          <Text style={styles.header}>{t('components.new_orders.orders_not_found')}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.orderSubHeaderDetailsText}>
          {isFiltered
            ? t('components.new_orders.orders_not_found')
            : defaultText}
        </Text>
      </View>
    </Box>
  );
};

export {NoOrders};
