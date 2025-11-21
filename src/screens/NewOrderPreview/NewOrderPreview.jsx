import React from 'react';
import {
  SecondaryHeader,
  ProfileButton,
  Box,
  OrderDetailsItem,
  Button,
  Loader,
} from '../../components';
import {ROUTES} from '../../routing/routes';
import {
  formatCashValue,
  formatDisplayDate,
  formatDisplayTime,
  formatOrderQuantity,
} from '../../util/DisplayFormatterUtils';
import {View, SafeAreaView,Text} from 'react-native';
import styles from './NewOrderPreview.styles';
import {useInsertOrder, useNewOrderPriceEstimate} from '../../hooks/data';
import { useTranslate } from '../../hooks/useTranslate';

const NewOrderPreview = ({navigation, route}) => {
  const { t} = useTranslate();
  const {formData} =JSON.parse(route.params.data);
  const {insertOrder, isLoadingOrder} = useInsertOrder();
  const handlePlaceNewOrder = () => {
    const onInsertComplete = () =>
      navigation.reset({index: 0, routes: [{name: ROUTES.HOME}]});
    insertOrder(formData, onInsertComplete);
  };
 
  return (
    <SafeAreaView style={{flex:1}}>
    <SecondaryHeader
      title={t('new_preview_order_form.order')}
      menuItem={
        <ProfileButton onPress={() => navigation.navigate(ROUTES.PROFILE)} />
      }
      onBackPress={() => navigation.goBack()}
      footer={
        <View style={styles.submitContainer}>
          <Button
            label={t('new_preview_order_form.confirm')}
            variant="solid"
            onPress={handlePlaceNewOrder}
            loading={isLoadingOrder}
          />
        </View>
      }
    >
      <Box>
          <>
            <OrderDetailsItem
              header={t('new_preview_order_form.obj')}
              text={formData.object.addressName}
            />
            <OrderDetailsItem
              header={t('new_preview_order_form.location')}
              text={formData.location.address ?? formData.object.addressName}
            />
            <OrderDetailsItem header={t('new_preview_order_form.brand')} text={formData.product.name} />
            <OrderDetailsItem
              header={t('new_preview_order_form.quantity')}
              text={formatOrderQuantity(formData.amount)}
            />
            <OrderDetailsItem
              header={t('new_preview_order_form.date')}
              text={formatDisplayDate(new Date(formData.date))}
            />
            <OrderDetailsItem
              header={t('new_preview_order_form.start')}
              text={formatDisplayTime(
                formData.time.hours,
                formData.time.minutes,
              )}
            />
            <View style={[styles.containerBase, styles.deliveryContainer]}>
              <Text style={styles.text}>Pristatymas</Text>
              <Text style={styles.boldText}>
                {formData.ownTransport ? t('new_preview_order_form.included') : t('new_preview_order_form.not_included')}
              </Text>
            </View>
          </>
      </Box>
    </SecondaryHeader>
    </SafeAreaView>
  );
};

export {NewOrderPreview};
