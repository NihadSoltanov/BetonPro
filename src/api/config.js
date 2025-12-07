import {DELIVERY_STATUS} from '../config';

const ENDPOINTS = {
  ROOT: 'https://bendras.hcapskaita.lt/go.php?mod=ecocretesmart&act=',
  API_URL_LT:'https://bendras.hcapskaita.lt/go.php?mod=ecocretesmart&act=',
  API_URL_LV:'https://generalis.hclv.lv/go.php?mod=cretozaurus&act=',
  API_URL_CR:'https://general.hmbetonas.lt/go.php?mod=ecocretesmart&act=',
  API_URL_HMOBILE: 'https://lt-mob.hmbetonpro.eu/go.php?mod=ecocretesmart&act=',
  SLUMP_MOBILE_LT: 'https://lt-mob.hmbetonpro.eu/go.php?mod=ecocretesmart&act=getSlumpMobile',
  STRENGTH_MOBILE_LT: 'https://lt-mob.hmbetonpro.eu/go.php?mod=ecocretesmart&act=getStrengthMobile',
  LOGIN: 'login',
  REGISTER: 'register',
  MIXTURES_AND_PUMPS: 'getMixturesAndPumps',
  FACTORIES: 'getPadaliniai',
  ONGOING_ORDERS: 'getOngoingOrders',
  CREATE_ORDER: 'insertOrder',
  ORDER_HISTORY: 'getOrderHistory',
  COORDINATES: 'getCoordinates',
  DELIVERY_ETA: 'getDeliveryEta',
  SLUMP_IMAGE: 'getSlumpJpeg',
  SEND_INVOICE: 'send_vazt',
  DELIVERY_INTERVALS: 'getIntervalai',
  ORDER_COUNTS: 'getOngoingOrdersCount',
  USER_DATA: 'getUserData',
  SUPPORT_CONTACTS_LT:
    'https://bendras.hcapskaita.lt/go.php?mod=getSupportContacts',
  SUPPORT_CONTACTS_LV:
    'https://generalis.hclv.lv/go.php?mod=getSupportContacts',
  SUPPORT_CONTACTS_CR:'https://general.hmbetonas.lt/go.php?mod=getSupportContacts',
  OBJECTS: 'getObjects',
  PRODUCTS: 'getProducts',
  OBJECT: 'getObjectData',
  LOGOUT_LT: 'https://bendras.hcapskaita.lt/go.php?mod=off',
  LOGOUT_LV: 'https://generalis.hclv.lv/go.php?mod=off',
  LOGOUT_CR: 'https://general.hmbetonas.lt/go.php?mod=off',
  PENDING_ORDERS: 'getPendingOrders',
  NEW_ORDER_PRICE: 'getOrderPrice',
  CANCEL_ORDER: 'cancelOrder',
  ONGOING_ORDER: 'getOngoingOrder',
  SIGN_DELIVERY: 'signWayBill',
  EDIT_ORDER: 'updateOrder',
  COWORKERS: 'getCoWorkers',
  GRAPH: 'getGraphData',
  ORDER_HISTORY_GRAPH: 'getLoadingChartJson',
  Classes: 'getClasses',
  USER_EXISTS: 'userExists',
};

const DELIVERY_STATUS_MAP = {
  [DELIVERY_STATUS.PRODUCTION]: [-1, 0, 5, 1],
  [DELIVERY_STATUS.TRANSIT]: [2],
  [DELIVERY_STATUS.ONSITE]: [6, 7],
  [DELIVERY_STATUS.DELIVERED]: [3, 8],
};

const DELIVERY_SUB_STATUS_TITLE = {
  [-1]: 'Planuojamas',
  0: 'Riuošiamas',
  5: 'Pakrautas',
  1: 'Kokybė patikrinta',
  2: 'Kelyje',
  6: 'Atvyko',
  7: 'Iškrautas',
  8: 'Pristatytas',
  3: 'Pristatytas',
  10: 'Iškraunamas',
};

const NOT_TRACKED_STATUSES = [3,8];
const ONSITE_TIMELINE = [5, 2, 6, 10];
const UNLOADING_STATUS_IN_HISTORIC_DELIVERY = '6';

export {
  ENDPOINTS,
  DELIVERY_STATUS_MAP,
  DELIVERY_SUB_STATUS_TITLE,
  NOT_TRACKED_STATUSES,
  ONSITE_TIMELINE,
  UNLOADING_STATUS_IN_HISTORIC_DELIVERY,
};
