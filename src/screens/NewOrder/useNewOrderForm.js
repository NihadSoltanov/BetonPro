import {useEffect, useContext, useState} from 'react';
import {useObjects, usePumps} from '../../hooks/data';
import {ROUTES} from '../../routing/routes';
import {NEW_ORDER_CONFIG} from '../../components/OrderForm/config';
import {useForm} from '../../hooks/useForm';
import * as FormValidator from '../../util/FormValidator';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslate } from '../../hooks/useTranslate';
import { AuthContext } from '../../context/AuthProvider';
import API from '../../api/API';

export const useNewOrderForm = () => {
  const { t} = useTranslate();
  const initialValues = {
    amount: null,
    ownTransport: false,
    isHydraulicChuteRequired: false,
    comment: null,
    object: null,
    location: null,
    date: null,
    time: {hours: null, minutes: null},
    interval: null,
    pump: null,
    product: null,
  };

  const {objects} = useObjects();
  const {pumps} = usePumps();
  const navigation = useNavigation();
  const route = useRoute();
  const {session} = useContext(AuthContext);

  const {
    formData,
    onValueChange,
    clearValues,
    formErrors,
    validateForm,
    removeError,
  } = useForm(initialValues, {
    amount: [
      FormValidator.isRequired(),
      (val) =>
        FormValidator.isOutsideRange(
          NEW_ORDER_CONFIG.MIN_AMOUNT,
          Number.MAX_SAFE_INTEGER,
        )(val),
    ],
    ownTransport: [],
    isHydraulicChuteRequired: [],
    comment: [],
    object: [FormValidator.isRequired()],
    location: [FormValidator.isRequired()],
    date: [FormValidator.isRequired()],
    time: [
      (val) => FormValidator.isRequired()(val.hours),
      (val) => {
        const {DELIVERY} = NEW_ORDER_CONFIG;
        if (val.hours < DELIVERY.START)
          return `${t('new_order_form.use_new_form.earliest_time')} 0${DELIVERY.START}:00`;
        if (
          val.hours > DELIVERY.END ||
          (val.hours === DELIVERY.END && val.minutes > 0)
        )
          return `${t('new_order_form.use_new_form.latest_time')} ${DELIVERY.END}:00`;
      },
    ],
    interval: [
      (val) => {
        if (!formData.ownTransport) {
          return FormValidator.isRequired()(val);
        }
      },
    ],
    pump: [],
    product: [FormValidator.isRequired()],
  });

  const valueHandlers = {
    object: (val) => {
      clearValues(['product', 'location', 'amount']);
      onValueChange(val, 'object');
    },
    location: () =>
      navigation.navigate(ROUTES.LOCATION_SELECTOR, {
        selectedMarker: formData.location,
        selectedObject: formData.object,
      }),
    product: (val) => onValueChange(val, 'product'),
    amount: (val) => onValueChange(val, 'amount'),
    date: (val) => onValueChange(val, 'date'),
    time: (hours, minutes) => onValueChange({hours, minutes}, 'time'),
    ownTransport: (val) => {
      removeError('interval');
      onValueChange(val, 'ownTransport');
    },
    interval: (val) => onValueChange(val, 'interval'),
    isHydraulicChuteRequired: (val) => {
      onValueChange(val, 'isHydraulicChuteRequired');
    },
    pump: (val) => {
      removeError('pump');
      onValueChange(val, 'pump');
    },
    comment: (val) => onValueChange(val, 'comment'),
  };

  let disabledFields = {
    object: false,
    location: !formData?.object,
    product: !formData?.object,
    amount: !formData?.object,
    date: false,
    time: false,
    ownTransport: false,
    interval: formData?.ownTransport,
    isHydraulicChuteRequired: false,
    pump: false,
    comment: false,
  }

  if(session.agreement_type === 'private')
  {
    disabledFields = {
      object: false,
      location: false,
      product: false,
      amount: false,
      date: false,
      time: false,
      ownTransport: false,
      interval: formData?.ownTransport,
      isHydraulicChuteRequired: false,
      pump: false,
      comment: false,
    };
  }



  useEffect(() => {
    if (route.params?.coordinates) {
      const marker = route.params;
      onValueChange(
        {
          address: marker.address,
          coordinates: marker.coordinates,
          id: marker.id,
          title: marker.title,
        },
        'location',
      );
    }
  }, [route]);

  const submit = () => {
    const errors = validateForm();
    if (!errors) {
      const data = JSON.stringify({formData});
      navigation.navigate(ROUTES.NEW_ORDER_PREVIEW,{data});
      //save in storage
    }
  };

  return {
    formData,
    formErrors,
    objects,
    pumps,
    valueHandlers,
    disabledFields,
    submit,
  };
};
