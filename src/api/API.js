import RequestType from './NetworkLayerCentral';
import {ApiDataMapper} from './ApiDataMapper';
import {ENDPOINTS} from './config';
import axios from 'axios';

const register = (data) =>
  RequestType.postRequest(
    ENDPOINTS.REGISTER,
    ApiDataMapper.mapRegisterRequest(data),
    false,
  ).then((resp) => ApiDataMapper.mapRegisterResponse(resp));

const login = (data) => {
  console.log("🟢 [API] login() input:", data);

  const mapped = ApiDataMapper.mapLoginRequest(data);
  console.log("🟣 [API] mapped payload before sending:", mapped);

  return RequestType.postRequest(
    ENDPOINTS.LOGIN,
    mapped,
    false,
  )
    .then((resp) => {
      return ApiDataMapper.mapLoginResponse(resp);
    })
    .catch((err) => {
      throw err;
    });
};

const getSlumpMobile = (orderId, db) => {
  const query = `&order_id=${orderId}&db=${db}`;
  return RequestType.getRequest(ENDPOINTS.SLUMP_MOBILE_LT, query)
    .then(resp => resp)
    .catch(err => {
      console.log("❌ Slump fetch error:", err);
      throw err;
    });
};
const getStrengthMobile = (orderId, db) => {
  const query = `&order_id=${orderId}&db=${db}`;
  return RequestType.getRequest(ENDPOINTS.STRENGTH_MOBILE_LT, query)
    .then(resp => resp)          // şimdilik raw JSON dönüyoruz
    .catch(err => {
      console.log("❌ Strength fetch error:", err);
      throw err;
    });
};


const getMixturesAndPumps = () =>
  RequestType.getRequest(ENDPOINTS.MIXTURES_AND_PUMPS).then((resp) =>
    ApiDataMapper.mapMixturesAndPumpsResponse(resp),
  );

const getFactories = () =>
  RequestType.getRequest(ENDPOINTS.FACTORIES).then((resp) =>
    ApiDataMapper.mapFactoriesResponse(resp),
  );

const getOngoingOrders = (filters) =>
  RequestType.postRequest(
    ENDPOINTS.ONGOING_ORDERS,
    ApiDataMapper.mapFiltersRequest(filters),
  ).then((resp) => ApiDataMapper.mapOngoingOrdersResponse(resp));

const insertOrder = (data) =>
  RequestType.postRequest(
    ENDPOINTS.CREATE_ORDER,
    ApiDataMapper.mapCreateOrderRequest(data),
  );
const getOrderHistoryGraphData = (payload) => {
  console.log("📤 [API] Sending Graph Payload:", JSON.stringify(payload, null, 2));

  return RequestType.postRequest(
    ENDPOINTS.ORDER_HISTORY_GRAPH,
    {
      user: "",
      psw: "",
      ...payload
    }
  )
    .then((resp) => {
      console.log("📥 [API] FULL Graph Response:", JSON.stringify(resp, null, 2));
      return resp;
    })
    .catch((err) => {
      console.log("❌ [API] Graph Error:", err);
      throw err;
    });
};


const getOrderHistory = ({page, limit, filters}) =>
  RequestType.postRequest(ENDPOINTS.ORDER_HISTORY, {
    page,
    limit,
    ...ApiDataMapper.mapFiltersRequest(filters),
  }).then((resp) => ApiDataMapper.mapOrdersResponse(resp));

const getCoordinates = () =>
  RequestType.getRequest(ENDPOINTS.COORDINATES).then((resp) =>
    ApiDataMapper.mapCoordinatesResponse(resp),
  );

// Could not find a single usage
const getDeliveryEta = (urlData) =>
  RequestType.getRequest(ENDPOINTS.DELIVERY_ETA, urlData);

// Could not find a single usage
const getSlumpJpeg = (userName, userPsw, db, tikslas_id) =>
  RequestType.getRequest(ENDPOINTS.SLUMP_IMAGE, {
    userName,
    userPsw,
    db,
    tikslas_id,
  });

// Could not find a single usage
const send_vazt = (urlData) =>
  RequestType.getRequest(ENDPOINTS.SEND_INVOICE, urlData, true, false);

const getOrderCounts = () =>
  RequestType.getRequest(ENDPOINTS.ORDER_COUNTS).then((resp) =>
    ApiDataMapper.mapOrderCountsResponse(resp),
  );

// Could not find a single usage
const getMixturesAndPumpsByDb = (url) => RequestType.getRequest(url);

const getUserData = () =>
  RequestType.getRequest(ENDPOINTS.USER_DATA).then((resp) =>
    ApiDataMapper.mapUserData(resp),
  );

const getSupportContacts = () =>
  axios
    .get(ENDPOINTS.SUPPORT_CONTACTS_LT)
    .then((resp) => ApiDataMapper.mapSupportContacts(resp.data));

const getObjects = (coworker) => {

  return RequestType.getRequest(ENDPOINTS.OBJECTS, `&coworker=${encodeURIComponent(coworker)}`)
    .then((resp) => {
      if (typeof resp === 'string') {
        try {
          const clean = resp.replace(/^.*?({)/s, '$1').trim();
          resp = JSON.parse(clean);
        } catch (e) {
          return { objects: [] };
        }
      }

      if (!resp || !Array.isArray(resp.objects)) {
        return { objects: [] };
      }

      return ApiDataMapper.mapObjects(resp);
    });
};



const getProducts = (agreement, longitude, latitude) => {
  const baseUrl = ENDPOINTS.PRODUCTS;
  const queryParams = `&agreement=${agreement}&long=${longitude}&lat=${latitude}`;
  const fullUrl = `${baseUrl}${queryParams}`;

  return RequestType.getRequest(fullUrl)
    .then((resp) => ApiDataMapper.mapProducts(resp))
    .catch((e) => {
      console.log("Error:", e);
    });
};

const getObject = (branchId, objectId) =>
  RequestType.getRequest(
    ENDPOINTS.OBJECT,
    `&branch=${branchId}&o_id=${objectId}`,
  ).then((resp) => ApiDataMapper.mapObject(resp));

const logout = (logOutURL) =>
  axios.get(logOutURL).then((resp) => console.log(resp));

const getPendingOrders = (filters) =>
  RequestType.postRequest(
    ENDPOINTS.PENDING_ORDERS,
    ApiDataMapper.mapFiltersRequest(filters),
  ).then((resp) => ApiDataMapper.mapPendingOrdersResponse(resp));

const getPreviewPrice = (data) =>
  RequestType.postRequest(
    ENDPOINTS.NEW_ORDER_PRICE,
    ApiDataMapper.mapPricePreviewRequest(data),
  ).then((resp) => {
    if (isNaN(resp)) return null;
    return resp;
  });

const cancelOrder = ({orderId, dbId}) =>
  RequestType.getRequest(
    ENDPOINTS.CANCEL_ORDER,
    `&o_id=${orderId}&db=${dbId}`,
  ).then((resp) => resp);

const getOngoingOrder = (orderId, dbId) => {
  const q = `&id=${orderId}&db=${dbId}`;
  const url = `${ENDPOINTS.ONGOING_ORDER}${q}`;


  return RequestType.getRequest(ENDPOINTS.ONGOING_ORDER, q)
    .then((resp) => {

      const rawItem = resp?.item?.[0];




      const deliveries = rawItem?.delivery;


      if (Array.isArray(deliveries)) {
        deliveries.forEach((d, i) => {

          const tl = d?.timeline
            ? (Array.isArray(d.timeline) ? d.timeline : Object.values(d.timeline))
            : [];
          const last = tl.length > 0 ? tl[tl.length - 1] : null;


        });
      }


      return rawItem && resp?.item?.length === 1
        ? ApiDataMapper.mapOngoingOrderResponse(rawItem)
        : {};
    });
};


const signDelivery = ({id, db}) =>
  RequestType.getRequest(ENDPOINTS.SIGN_DELIVERY, `&id=${id}&db=${db}`).then(
    (resp) => {
      console.log(resp);
    },
  );

const editOrder = (data, orderId) =>
  RequestType.postRequest(
    `${ENDPOINTS.EDIT_ORDER}&id=${orderId}`,
    ApiDataMapper.mapEditOrderRequest(data),
  ).then((resp) => {
    return resp === 1;
  });

const getCoworkers = () =>
  RequestType.getRequest(ENDPOINTS.COWORKERS).then((resp) => {
    return ApiDataMapper.mapCoworkerResponse(resp);
  });

const getGraphsData = () =>
  RequestType.getRequest(ENDPOINTS.GRAPH).then((resp) => {
    return ApiDataMapper.mapGraphsResponse(resp);
  });

const getClassessData = () =>
  RequestType.getRequest(ENDPOINTS.Classes).then((resp) => {
    return ApiDataMapper.mapClassessResponse(resp);
  });

const userExists = (email) =>
  RequestType.getRequest(ENDPOINTS.USER_EXISTS, `&email=${email}`).then((resp) => {
    return resp;
  });

const API = {
  register,
  login,
  insertOrder,
  getOrderHistory,
  getCoordinates,
  getMixturesAndPumps,
  getFactories,
  getOngoingOrders,
  getOrderCounts,
  getDeliveryEta,
  getSlumpJpeg,
  send_vazt,
  getMixturesAndPumpsByDb,
  getUserData,
  getSupportContacts,
  getObjects,
  getProducts,
  getObject,
  logout,
  getPendingOrders,
  getPreviewPrice,
  cancelOrder,
  getOngoingOrder,
  signDelivery,
  editOrder,
  getCoworkers,
  getGraphsData,
  getClassessData,
  userExists,
  getSlumpMobile,
    getStrengthMobile,
    getOrderHistoryGraphData
};

export default API;
