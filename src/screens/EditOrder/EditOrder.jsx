import React from 'react';
import {View,SafeAreaView} from 'react-native';
import {
  SecondaryHeader,
  ProfileButton,
  Button,
  OrderForm,
} from '../../components';
import styles from './EditOrder.styles';
import {ROUTES} from '../../routing/routes';
import {useEditOrderForm} from './useEditOrderForm';
import { useTranslate } from '../../hooks/useTranslate';

const EditOrder = ({navigation, route}) => {
  const { t} = useTranslate();
  const {formData, formErrors, valueHandlers, disabledFields, submit} =
    useEditOrderForm();

  return (
    <SafeAreaView style={{flex:1}}>
    <SecondaryHeader
      title={`${t('edit_order_form.edit')} ${
        route.params?.order ? `#${route.params.order.id}` : ''
      }`}
      menuItem={
        <ProfileButton onPress={() => navigation.navigate(ROUTES.PROFILE)} />
      }
      onBackPress={() => navigation.goBack()}
      footer={
        <View style={styles.submitContainer}>
          <View flex={0.5}>
            <Button
              label={t('edit_order_form.cancel')}
              variant="outlined"
              onPress={() => navigation.goBack()}
              buttonStyle={styles.cancelButton}
            />
          </View>
          <View flex={1}>
            <Button
              label={t('edit_order_form.save_changes')}
              variant="solid"
              onPress={submit}
            />
          </View>
        </View>
      }
    >
      <OrderForm
        formData={formData}
        formErrors={formErrors}
        valueHandlers={valueHandlers}
        disabledFields={disabledFields}
        pumps={[]}
        objects={[]}
        products={formData?.object?.availableProducts}
      />
    </SecondaryHeader>
    </SafeAreaView>
  );
};

export {EditOrder};
