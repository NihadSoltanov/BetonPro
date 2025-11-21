import React from 'react';
import {View, Text} from 'react-native';
import {DeliveryListItem} from '../DeliveryListItem/DeliveryListItem';
import styles from './OrderHistoryItem.styles';
import {IconButton, OrderDetailsItem, OrderCard} from '../../../../components';
import {DotsSvg} from '../../../../assets/icons';
import {
  formatOrderQuantity,
  formatDisplayDate,
} from '../../../../util/DisplayFormatterUtils';
import { useTranslate } from '../../../../hooks/useTranslate';

function OrderHistoryItem({
  item,
  onPress,
  isOpen,
  onMorePress,
  onDeliveryMorePress,
}) {
  const { t} = useTranslate();
  return (
    <View style={styles.orderItem}>
      <OrderCard
        displayOrdered={true}
        item={item}
        onPress={onPress}
        isOpen={isOpen}
        header={
          <View>
            {item.unsignedDocumentCount > 0 && (
              <View style={styles.unsignedDocumentNotification}>
                <Text
                  style={styles.unsignedDocumentNotificationText}
                  numberOfLines={1}
                >
                  {item.unsignedDocumentCount > 10
                    ? '9+'
                    : item.unsignedDocumentCount}
                </Text>
              </View>
            )}
            {
              item.invoiceId !== 0 && (
               <IconButton Icon={DotsSvg} onPress={() => onMorePress(item)} />
              )
            }
           
          </View>
        }
      >
        <OrderDetailsItem header={t('order_history_form.invoice_history_item.brand')} text={item.productName} />
        <OrderDetailsItem
          header={t('order_history_form.invoice_history_item.quantity')}
          text={formatOrderQuantity(item.quantity)}
        />
        <OrderDetailsItem
          header={t('order_history_form.invoice_history_item.date')}
          text={item.date ? formatDisplayDate(new Date(item.date)) : '-'}
        />
        <OrderDetailsItem header={t('order_history_form.invoice_history_item.start')} text={item.plannedTime ?? '-'} />
        {item.plannedEndTime && (
          <OrderDetailsItem header={t('order_history_form.invoice_history_item.note')} text={item.plannedEndTime ?? '-'} />
        )}
        <View style={styles.deliveryItemWrapper}>
          {Array.isArray(item.deliveries) &&
            Array.from(item.deliveries).map((delivery) => {
              if (delivery.information == 1) {
                return (
                  <DeliveryListItem
                    key={delivery.id}
                    item={delivery}
                    onPress={() => onDeliveryMorePress(delivery)}
                  />
                );
              }
            })}
        </View>
      </OrderCard>
    </View>
  );
}

export {OrderHistoryItem};
