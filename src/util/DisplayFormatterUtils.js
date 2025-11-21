import {PENDING_ORDER_STATUS} from '../api/orderStatus';
import {DELIVERY_STATUS} from '../config';

const formatNumber = (number) => {
  if (number > 9) return number;

  return `0${number}`;
};

const formatDisplayTime = (hours, minutes) =>
  `${formatNumber(hours)}:${formatNumber(minutes)}`;

const formatDisplayDate = (date) =>
  date ? date.toISOString().split('T')[0].replaceAll('-', '/') : '';

const formatOrderQuantity = (quantity) =>
  quantity ? `${parseFloat(quantity).toFixed(2)} m3` : '0.00 m3';

const mapDeliveryStatusToDisplayValue = (status) => {
  switch (status) {
    case DELIVERY_STATUS.DELIVERED:
      return 'Pristatyta';
    case DELIVERY_STATUS.ONSITE:
      return 'Atvyko';
    case DELIVERY_STATUS.PRODUCTION:
      return 'Įkeliama';
    case DELIVERY_STATUS.TRANSIT:
      return 'Atvyksta';
    default:
      return '';
  }
};

const mapPendingOrderStatusToDisplayValue = (status) => {
  switch (status) {
    case PENDING_ORDER_STATUS.APPROVED:
      return 'Priimta';
    case PENDING_ORDER_STATUS.PENDING:
      return 'Laukiama';
    default:
      return '';
  }
};

const parseProductName = (productName) => {
  const parsed = productName.split('-');

  if (parsed && parsed.length >= 3) {
    const [title, concreteClass, ...rest] = parsed;
    const name = `${title}-${concreteClass}`;
    let subText = '';
    rest.forEach((specification, i) => {
      subText += `${specification}`;
      if (i < rest.length - 1) subText += '-';
    });

    return {name, subText};
  } else {
    return {name: productName, subText: null};
  }
};

const formatCashValue = (val) => `€${parseFloat(val).toFixed(2)}`;

export {
  formatDisplayTime,
  formatDisplayDate,
  formatOrderQuantity,
  mapDeliveryStatusToDisplayValue,
  mapPendingOrderStatusToDisplayValue,
  formatCashValue,
  parseProductName,
};
