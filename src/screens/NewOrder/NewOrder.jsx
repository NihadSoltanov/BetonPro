import React from 'react';
import {View,SafeAreaView} from 'react-native';
import {
  SecondaryHeader,
  ProfileButton,
  Button,
  OrderForm,
} from '../../components';
import styles from './NewOrder.styles';
import {ROUTES} from '../../routing/routes';
import {useNewOrderForm} from './useNewOrderForm';
import { useTranslate } from '../../hooks/useTranslate';

const NewOrder = ({navigation}) => {
  const {
    formData,
    formErrors,
    valueHandlers,
    disabledFields,
    pumps,
    objects,
    submit,
  } = useNewOrderForm();
  const { t} = useTranslate();

  return (
    <SafeAreaView style={{flex:1}}>
    <SecondaryHeader
      title={t('new_order_form.add')}
      menuItem={
        <ProfileButton onPress={() => navigation.navigate(ROUTES.PROFILE)} />
      }
      onBackPress={() => navigation.goBack()}
      footer={
        <View style={styles.submitContainer}>
          <Button label={t('new_order_form.confirm')} variant="solid" onPress={submit} />
        </View>
      }
    >
      <OrderForm
        formData={formData}
        formErrors={formErrors}
        valueHandlers={valueHandlers}
        disabledFields={disabledFields}
        pumps={pumps}
        objects={objects}
        products={formData?.object?.availableProducts}
      />
    </SecondaryHeader>
    </SafeAreaView>
  );
};

export {NewOrder};
