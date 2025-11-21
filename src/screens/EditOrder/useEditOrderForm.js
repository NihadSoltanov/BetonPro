import {useEffect} from 'react';
import {useObjects, usePumps} from '../../hooks/data';
import {NEW_ORDER_CONFIG} from '../../components/OrderForm/config';
import {useForm} from '../../hooks/useForm';
import * as FormValidator from '../../util/FormValidator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {parseProductName} from '../../util/DisplayFormatterUtils';
import API from '../../api/API';
import {ROUTES} from '../../routing/routes';

export const useEditOrderForm = () => {
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

  const {formData, onValueChange, formErrors, validateForm, setAllFormValues} =
    useForm(initialValues, {
      ownTransport: [],
      isHydraulicChuteRequired: [],
      comment: [],
      object: [],
      location: [],
      interval: [],
      pump: [],
      product: [],
      date: [FormValidator.isRequired()],
      time: [
        (val) => FormValidator.isRequired()(val.hours),
        (val) => {
          const {DELIVERY} = NEW_ORDER_CONFIG;
          if (val.hours < DELIVERY.START)
            return `Ankščiausias įmanomas laikas 0${DELIVERY.START}:00`;
          if (
            val.hours > DELIVERY.END ||
            (val.hours === DELIVERY.END && val.minutes > 0)
          )
            return `Vėliausias įmanomas laikas ${DELIVERY.END}:00`;
        },
      ],
      amount: [
        FormValidator.isRequired(),
        (val) =>
          FormValidator.isOutsideRange(
            NEW_ORDER_CONFIG.MIN_AMOUNT,
            formData && formData.object
              ? formData.object.maximumAmountToOrder
              : Number.MAX_SAFE_INTEGER,
          )(val),
      ],
    });

  const valueHandlers = {
    object: () => {},
    location: () => {},
    product: () => {},
    amount: (val) => onValueChange(val, 'amount'),
    date: (val) => onValueChange(val, 'date'),
    time: (hours, minutes) => onValueChange({hours, minutes}, 'time'),
    ownTransport: () => {},
    interval: () => {},
    isHydraulicChuteRequired: () => {},
    pump: () => {},
    comment: () => {},
  };

  const disabledFields = {
    object: true,
    location: true,
    product: true,
    amount: false,
    date: false,
    time: false,
    ownTransport: true,
    interval: true,
    isHydraulicChuteRequired: true,
    pump: true,
    comment: true,
  };

  useEffect(() => {
    if (route.params?.order) {
      const {
        productName,
        date,
        quantity,
        address,
        interval,
        objectId,
        pumpValue,
        plannedTime,
      } = route.params.order;

      const product = parseProductName(productName);

      const selectedObject = objects?.find((object) => object.id === objectId);
      const selectedPump = pumps?.find((pump) => pump.value === pumpValue);
      const dateObj = new Date(date);
      const timeStrings = plannedTime ? plannedTime.split(':') : undefined;
      const time =
        timeStrings && timeStrings.length === 2
          ? {
              hours: parseInt(timeStrings[0], 10),
              minutes: parseInt(timeStrings[1], 10),
            }
          : {hours: 9, minutes: 0};
      const amount = parseFloat(quantity).toString();

      setAllFormValues({
        ...route.params.order,
        product,
        date: dateObj,
        time,
        amount,
        object: selectedObject,
        interval: interval,
        pump: selectedPump,
        location: {address},
      });
    }
  }, [route, objects, pumps]);

  const submit = () => {
    const errors = validateForm();
    if (!errors) {
      API.editOrder(
        {
          amount: formData.amount,
          date: formData.date,
          time: formData.time,
          db: formData.db,
        },
        formData.id,
      ).then((success) => {
        if (success) navigation.goBack();
        else navigation.navigate(ROUTES.ERROR);
      });
    }
  };

  return {
    formData,
    formErrors,
    valueHandlers,
    disabledFields,
    submit,
  };
};
