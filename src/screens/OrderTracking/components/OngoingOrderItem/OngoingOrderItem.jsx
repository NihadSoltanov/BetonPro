import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  OrderCard,
  OrderDetailsItem,
  Button,
  Loader,
  IconButton,
} from '../../../../components';
import {ProgressGraph} from '../ProgressGraph/ProgressGraph';
import styles from './OngoingOrderItem.styles';
import {DeliveryTimeline} from '../DeliveryTimeline/DeliveryTimeline';
import {useOngoingOrder} from '../../../../hooks/data/useOngoingOrder';
import {formatOrderQuantity} from '../../../../util/DisplayFormatterUtils';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../../../routing/routes';
import {PenSvg} from '../../../../assets/icons';
import {EditModal} from '../EditModal/EditModal';
import API from '../../../../api/API';
import {DELIVERY_COLORS_BY_STATUS} from '../../../../styles/theme';
import { useTranslate } from '../../../../hooks/useTranslate';
import SlumpGraph from '../../../../components/SlumpGraphModal/SlumpGraph';

function OngoingOrderItem({
  item,
  onPress,
  isOpen,
  onRefresh,
  onManagerPress,
}) {

  const { t } = useTranslate();
  const { navigate } = useNavigation();
  const [isEditVisible, setIsEditVisible] = useState(false);

  const { ongoingOrder, isLoadingOrder, getOngoingOrder } = useOngoingOrder(
    item.id,
    item.db,
    isOpen,
  );

  // ⬇️ TIKLAMA + PARAMS LOG (güncellendi)
  const handleMapTrackingPress = useCallback(() => {
    if (!ongoingOrder) {
      console.warn('FOLLOW_CLICK: ongoingOrder yok');
      return;
    }

    const params = {

      orderId: item.id,
      orderDb: item.db,

      ...(ongoingOrder.mapData || {}),
    };


    navigate(ROUTES.MAP_TRACKING, params);
  }, [navigate, ongoingOrder, item.id, item.db]);


  const onEditPress = () => {
    setIsEditVisible(true);
  };

  const onEditConfirm = (val) => {
    API.editOrder({amount: val, db: item.db}, item.id).then((success) => {
      if (success) {
        onRefresh();
        getOngoingOrder();
      } else {
        setIsEditVisible(false);
        navigate(ROUTES.ERROR);
      }
    });
  };

  const deliveryStatusConfig = useMemo(() => {
    if (item.hasDeliveriesOnsite)
      return {
        text: t('order_tracking_form.ongoing_orderitem.concrete_truck'),
        color: DELIVERY_COLORS_BY_STATUS.ONSITE,
      };
    if (
      item.nextDeliveryComingInMins !== null &&
      item.nextDeliveryComingInMins !== undefined
    ) {
      const deliveryMinutes = item.nextDeliveryComingInMins % 60;
      const deliveryHours =
        (item.nextDeliveryComingInMins - deliveryMinutes) / 60;

      return {
        text: `${t('order_tracking_form.ongoing_orderitem.another_concrete')}: ${
          deliveryHours > 0 ? `${deliveryHours} h. ` : ''
        }${item.nextDeliveryComingInMins > 0 ? `${deliveryMinutes} min.` : ''}`,
        color: DELIVERY_COLORS_BY_STATUS.TRANSIT,
      };
    }
    return null;
  }, [item, t]);

  return (
    <OrderCard
      item={item}
      onPress={onPress}
      isOpen={isOpen}
       onManagerPress={() =>
          onManagerPress?.(item.salesPerson, '+37069002555')
        }
      additionalInfo={
        <View>
          <View style={styles.additionalInfoRow}>
            <Text style={styles.additionalInfoText}>{t('components.order_card.delivered')}:</Text>
            <Text style={styles.additionalInfoText}>
              {`${
                item?.deliveryAmounts?.deliveredAmount
                  ? parseFloat(item.deliveryAmounts.deliveredAmount).toFixed(2)
                  : '0.00'
              }/${formatOrderQuantity(item.quantity)} `}
            </Text>
          </View>
          {deliveryStatusConfig && (
            <View style={styles.additionalInfoRow}>
              <Text
                style={[
                  styles.additionalInfoText,
                  {color: deliveryStatusConfig.color},
                ]}
              >
                {deliveryStatusConfig.text}
              </Text>
            </View>
          )}
        </View>
      }
    >
      <OrderDetailsItem header={t('order_tracking_form.ongoing_orderitem.brand')} text={item.productName} />
      {!isLoadingOrder && ongoingOrder && (
        <>
          <Text style={styles.amountText}>
            {`${ongoingOrder.deliveryAmounts.deliveredAmount?.toFixed(2)}/${formatOrderQuantity(
              ongoingOrder.deliveryAmounts.totalAmount,
            )} `}
            <Text style={styles.amountTextInner}>{t('components.order_card.delivered')}</Text>
          </Text>

          <ProgressGraph
            totalAmount={ongoingOrder.deliveryAmounts.totalAmount}
            deliveredAmount={ongoingOrder.deliveryAmounts.deliveredAmount}
            onSiteAmount={ongoingOrder.deliveryAmounts.onSiteAmount}
            transitAmount={ongoingOrder.deliveryAmounts.transitAmount}
            productionAmount={ongoingOrder.deliveryAmounts.productionAmount}
          />

          {ongoingOrder?.timelineData?.length > 0 && (
            <>
              <View style={styles.mapTrackButton}>
                <Button
                  label={t('order_tracking_form.ongoing_orderitem.follow_on_map')}
                  onPress={handleMapTrackingPress}
                  variant="outlined"
                />
              </View>

              <DeliveryTimeline
                timelineData={ongoingOrder.timelineData}
                onSignCallback={getOngoingOrder}
              />
            </>
          )}
        </>
      )}

      {isLoadingOrder && (
        <View style={styles.loaderContainer}>
          <Loader size="large" />
        </View>
      )}

      <View style={styles.editButtonContainer}>
        <IconButton
          Icon={PenSvg}
          iconStyles={styles.editButtonStyles}
          text={t('order_tracking_form.ongoing_orderitem.edit')}
          onPress={() => onEditPress(item.id)}
        />
      </View>

      {isEditVisible && (
        <EditModal
          isOpen={isEditVisible}
          onClose={() => setIsEditVisible(false)}
          onConfirm={(val) => onEditConfirm(val)}
          isLoading={false}
          deliveryAmounts={ongoingOrder?.deliveryAmounts}
        />
      )}
    </OrderCard>
  );
}

export { OngoingOrderItem };
