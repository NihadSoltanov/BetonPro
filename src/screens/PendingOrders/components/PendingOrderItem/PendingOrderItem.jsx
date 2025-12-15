
import React from 'react';
import styles from './PendingOrderItem.styles';
import {View} from 'react-native';
import {OrderCard, IconButton, OrderDetailsItem} from '../../../../components';
import {CrossWithCircleSvg, PenSvg} from '../../../../assets/icons';
import {StatusPill} from '../StatusPill/StatusPill';
import {
  formatDisplayDate,
  formatOrderQuantity,
  mapPendingOrderStatusToDisplayValue,
} from '../../../../util/DisplayFormatterUtils';
import {PENDING_ORDER_STATUS} from '../../../../api/orderStatus';
import { useTranslate } from '../../../../hooks/useTranslate';

function PendingOrderItem({
  item,
  onPress,
  isOpen,
  onCancelPress,
  onEditPress,
  onManagerPress
}) {
  const { t} = useTranslate();
  const isDateToday = (date) => {
    const today = new Date();
    const inputDate = new Date(date);
    return (
      today.getDate() === inputDate.getDate() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getFullYear() === inputDate.getFullYear()
    );
  };

  return (
    <OrderCard
      item={item}
      onPress={onPress}
      isOpen={isOpen}
      header={
        <StatusPill
          status={item.status}
          text={mapPendingOrderStatusToDisplayValue(item.status)}
        />
      }
  onManagerPress={() =>
      onManagerPress?.(item.salesPerson, "+37069002555")
    }
    >
      <OrderDetailsItem header={t('pending_orders_form.pending_orderitem.brand')} text={item.productName} />
      <OrderDetailsItem
        header={t('pending_orders_form.pending_orderitem.quantity')} 
        text={formatOrderQuantity(item.quantity)}
      />
      <OrderDetailsItem
        header={t('pending_orders_form.pending_orderitem.date')} 
        text={item.date ? formatDisplayDate(new Date(item.date)) : '-'}
      />
      <OrderDetailsItem header={t('pending_orders_form.pending_orderitem.start')}  text={item.plannedTime ?? '-'} />
      <View style={styles.pendingOrderCardActionContainer}>
        <IconButton
          Icon={PenSvg}
          iconStyles={styles.editButtonStyles}
          text={t('pending_orders_form.pending_orderitem.edit')}
          onPress={() => onEditPress(item.id)}
        />
        {!(
          isDateToday(item.date) &&
          item.status === PENDING_ORDER_STATUS.APPROVED
        ) && (
          <IconButton
            Icon={CrossWithCircleSvg}
            iconStyles={styles.cancelButtonStyles}
            text={t('pending_orders_form.pending_orderitem.delete')}
            onPress={onCancelPress}
          />
        )}
      </View>
    </OrderCard>
  );
}

export {PendingOrderItem};
