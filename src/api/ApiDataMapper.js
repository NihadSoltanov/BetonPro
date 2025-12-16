import {PENDING_ORDER_STATUS} from './orderStatus';
import {
  DELIVERY_STATUS_MAP,
  DELIVERY_SUB_STATUS_TITLE,
  NOT_TRACKED_STATUSES,
  ONSITE_TIMELINE,
  UNLOADING_STATUS_IN_HISTORIC_DELIVERY,
} from './config';
import {DELIVERY_STATUS} from '../config';
import {
  formatDisplayTime,
  parseProductName,
} from '../util/DisplayFormatterUtils';

const mapRegisterResponse = (response) => {
  return {
    success: response.success,
  };
};

const mapRegisterRequest = (request) => {
  return {
    name: request.name,
    person: request.person,
    psw: request.psw,
    tel: request.tel,
    email: request.email,
    tax: request.tax,
    code: request.code,
    address: request.address,
    privatus: request.privatus,
    lang: request.lang,
    ID:request.ID,
  };
};

const mapLoginResponse = (response) => {
  return {
    accessToken: response.access_token,
    user: response.login,
    psw: response.password,
    success: response.success,
    agreement: response.agreement,
    active: response.active
  };
};

const mapLoginRequest = (request) => {
  console.log("🧩 [Mapper] input:", request);

  const mapped = {
    user: request.username,
    psw: request.password,
    region: request.region, // ✅ doğru olmalı
  };

  console.log("🧩 [Mapper] output:", mapped);
  return mapped;
};


const mapUserExistsResponse = (request) => {
  return {
    exists: request.success,
  };
};


const mapMixturesAndPumpsResponse = (response) => {
  const mappedResponse = {pumps: [], mixtures: []};
  if (response.pumps) {
    response.pumps.forEach((pump) => {
      mappedResponse.pumps.push({value: pump.value, label: pump.label});
    });
  }

  if (response.mixtures) {
    response.mixtures.forEach((mixture) => {
      mappedResponse.mixtures.push({id: mixture.id, title: mixture.title});
    });
  }

  return mappedResponse;
};

const mapFactoriesResponse = (response) => {
  const mappedResponse = {factories: []};

  if (response.padaliniai) {
    response.padaliniai.forEach((factory) => {
      mappedResponse.factories.push({
        id: factory.id,
        title: factory.padalinys,
      });
    });
  }

  return mappedResponse;
};

const mapBackendStatus = (status) => {
  const backendStatus = parseInt(status, 10);

  if (DELIVERY_STATUS_MAP[DELIVERY_STATUS.PRODUCTION].includes(backendStatus))
    return DELIVERY_STATUS.PRODUCTION;
  if (DELIVERY_STATUS_MAP[DELIVERY_STATUS.TRANSIT].includes(backendStatus))
    return DELIVERY_STATUS.TRANSIT;
  if (DELIVERY_STATUS_MAP[DELIVERY_STATUS.ONSITE].includes(backendStatus))
    return DELIVERY_STATUS.ONSITE;
  if (DELIVERY_STATUS_MAP[DELIVERY_STATUS.DELIVERED].includes(backendStatus))
    return DELIVERY_STATUS.DELIVERED;
  return null;
};

const mapBackendTimelineToDisplayValues = (timeline, filters) => {
  return timeline
    .map((timeline) => {
      const timelineDate = new Date(timeline.time);
      const backendRawStatus = parseInt(timeline.status, 10);
      if (NOT_TRACKED_STATUSES.includes(backendRawStatus)) {
        return null;
      }

      if (filters && !filters(backendRawStatus)) return null;

      return {
        time: formatDisplayTime(
          timelineDate.getHours(),
          timelineDate.getMinutes(),
        ),
        title: DELIVERY_SUB_STATUS_TITLE[timeline.status],
      };
    })
    .filter((val) => val);
};

const createTimelineStepsForDeliveredItem = ({timeline}) => {
  if (!timeline) return [];
  return mapBackendTimelineToDisplayValues(timeline);
};

const createTimelineStepsForNonTrackedItem = (delivery) => {
  const result = [];
  result.push({time: delivery.salytis, title: 'Pagaminta'});
  result.push({time: delivery.t_end, title: 'Pristatyta'});

  return result;
};

const createTimelineStepsForDeliveryItem = (status, delivery) => {
  const { timeline, eta } = delivery;

  console.log('🪪 [TimelineItem Check]');
  console.log('  Car:', delivery.cars);
  console.log('  Raw status:', delivery.status);
  console.log('  Mapped status:', status);
  console.log('  ETA:', eta);
  console.log('  Timeline statuses:', timeline?.map?.(t => t.status) ?? []);

  // ✅ 1. Transit (status=2) için sabit metin
  if (status === DELIVERY_STATUS.TRANSIT) {
    const title = 'Kelyje'; // veya 'Transit'
    console.log('  👉 Transit detected → forcing title:', title);
    return [{ title }];
  }

  // ✅ 2. Onsite (status=6,7)
  if (status === DELIVERY_STATUS.ONSITE) {
    const steps = mapBackendTimelineToDisplayValues(timeline, (val) => {
      if (!ONSITE_TIMELINE.includes(val)) return null;
      return true;
    });
    console.log('  🏗️ Onsite steps:', steps);
    return steps;
  }

  // ✅ 3. Delivered veya diğerleri
  let title = '';
  if (timeline && timeline.length > 0) {
    const last = timeline[timeline.length - 1]?.status;
    title = DELIVERY_SUB_STATUS_TITLE[last] || '';
  } else {
    title = DELIVERY_SUB_STATUS_TITLE[delivery.status] || '';
  }

  console.log('  🧾 Final title resolved:', title);
  return [{ title }];
};


// --------------------
// HELPERS (YENİ: timeline normalize)
// --------------------
const normalizeTimelineToArray = (timeline) => {
  if (!timeline) return [];
  if (Array.isArray(timeline)) return timeline;
  if (typeof timeline === 'object') return Object.values(timeline).filter(Boolean);
  return [];
};

const createDatasetForMapTracking = (order) => {
  const parseCoordinate = (val) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return null;
    return parsed;
  };

  const parseDelivery = (delivery) => {

    let long = parseCoordinate(delivery?.current_auto_x);
    let lat  = parseCoordinate(delivery?.current_auto_y);


    if (!Number.isFinite(lat) || !Number.isFinite(long)) {
      const tl = normalizeTimelineToArray(delivery?.timeline)
        .map(p => ({
          lat: parseCoordinate(p?.latitude),
          lng: parseCoordinate(p?.longitude),
          time: p?.time ? new Date(p.time).getTime() : 0,
          status: p?.status
        }))
        .filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lng));

      if (tl.length > 0) {
        tl.sort((a, b) => b.time - a.time);
        lat = tl[0].lat;
        long = tl[0].lng;
      }
    }

    if (!Number.isFinite(lat) || !Number.isFinite(long)) return null;



  const status = mapBackendStatus(delivery.status);
  const tlArr = normalizeTimelineToArray(delivery?.timeline);

  let subTitle = null;

  // 🟩 Transit (status = 2) durumunda sabit "Kelyje" yaz
  if (status === DELIVERY_STATUS.TRANSIT) {
    subTitle = 'Kelyje';
  }
  else if (tlArr.length > 0) {
    const last = tlArr[tlArr.length - 1];
    subTitle = DELIVERY_SUB_STATUS_TITLE[last?.status] ?? null;
  }
  else {
    subTitle = DELIVERY_SUB_STATUS_TITLE[delivery.status] ?? null;
  }

  // test için log
  console.log('🧭 MapTracking Subtitle', {
    car: delivery.cars,
    rawStatus: delivery.status,
    mapped: status,
    subTitle
  });

    return {
      latitude: lat,
      longitude: long,
      status: status,
      licensePlate: delivery.cars,
      amount: delivery.quantity,
      id: delivery.id,
      estimateArrival: status === DELIVERY_STATUS.TRANSIT ? delivery.eta : null,
      subTitle,
    };
  };

  const destination = {
    latitude: parseCoordinate(order.order_y),
    longitude: parseCoordinate(order.order_x),
    name: order.address,
  };

  const factory = {
    latitude: parseCoordinate(order.plant_y),
    longitude: parseCoordinate(order.plant_x),
    name: order.branch,
  };

  return {
    region:
      !!destination.latitude && !!destination.longitude ? destination : null,
    destination:
      !!destination.latitude && !!destination.longitude ? destination : null,
    factory: !!factory.latitude && !!factory.longitude ? factory : null,
    deliveries:
      order.delivery
        ?.map((delivery) => parseDelivery(delivery))
        .filter((val) => val) ?? [],
    orderId: order.id,
    orderDb: order.db,
  };
};

const createDeliveryDatasetForTimeline = (order) => {
  const timelineData = {
    [DELIVERY_STATUS.PRODUCTION]: [],
    [DELIVERY_STATUS.TRANSIT]: [],
    [DELIVERY_STATUS.ONSITE]: [],
    [DELIVERY_STATUS.DELIVERED]: [],
  };

  if (!order || !order.delivery || order.delivery.length < 1) return null;

  order.delivery.forEach((delivery) => {
    const status = mapBackendStatus(delivery.status);
    if (status) {
      timelineData[status].push({
        status: status,
        licensePlate: delivery.cars,
        amount: delivery.quantity,
        steps: delivery.tikslas_id
          ? status === DELIVERY_STATUS.DELIVERED
            ? createTimelineStepsForDeliveredItem(delivery)
            : createTimelineStepsForDeliveryItem(status, delivery)
          : createTimelineStepsForNonTrackedItem(delivery),
        signed:
          status === DELIVERY_STATUS.DELIVERED ? delivery.signed : undefined,
        id: delivery.id,
        db: delivery.db,
        isGpsTracked: !!delivery.tikslas_id,
        plant: {
           temperature: delivery.plant?.temperature ?? null,
           slump: delivery.plant?.slump ?? null,
         },
        onSite: {
            temperature: delivery.onSite?.temperature ?? null,
           slump: delivery.onSite?.slump ?? null,
          },
      });
    }
  });

  const result = [];
  if (timelineData[DELIVERY_STATUS.PRODUCTION].length > 0) {
    result.push({
      title: 'Gamyboje',
      amount: timelineData[DELIVERY_STATUS.PRODUCTION].reduce(
        (a, b) => a + parseFloat(b.amount),
        0,
      ),
      status: DELIVERY_STATUS.PRODUCTION,
      data: timelineData[DELIVERY_STATUS.PRODUCTION],
    });
  }

  if (timelineData[DELIVERY_STATUS.TRANSIT].length > 0) {
    result.push({
      title: 'Kelyje',
      amount: timelineData[DELIVERY_STATUS.TRANSIT].reduce(
        (a, b) => a + parseFloat(b.amount),
        0,
      ),
      status: DELIVERY_STATUS.TRANSIT,
      data: timelineData[DELIVERY_STATUS.TRANSIT],
    });
  }

  if (timelineData[DELIVERY_STATUS.ONSITE].length > 0) {
    result.push({
      title: 'Vietoje',
      amount: timelineData[DELIVERY_STATUS.ONSITE].reduce(
        (a, b) => a + parseFloat(b.amount),
        0,
      ),
      status: DELIVERY_STATUS.ONSITE,
      data: timelineData[DELIVERY_STATUS.ONSITE],
    });
  }

  if (timelineData[DELIVERY_STATUS.DELIVERED].length > 0) {
    result.push({
      title: 'Pristatyta',
      amount: timelineData[DELIVERY_STATUS.DELIVERED].reduce(
        (a, b) => a + parseFloat(b.amount),
        0,
      ),
      status: DELIVERY_STATUS.DELIVERED,
      data: timelineData[DELIVERY_STATUS.DELIVERED],
    });
  }
  const lastDeliveryItem = result[result.length - 1];

  if (lastDeliveryItem.data) {
    let lastDeliveryFinalItem =
      lastDeliveryItem.data[lastDeliveryItem.data.length - 1];
    if (lastDeliveryFinalItem) {
      result[result.length - 1].data[lastDeliveryItem.data.length - 1] = {
        ...lastDeliveryFinalItem,
        noBorder: true,
      };
    }
  }

  return result;
};

const getAmountsFromOngoingOrder = (order) => {
  if (!order) return null;
  if (!order.delivery || order.delivery.length < 1) {
    return {
      totalAmount: parseFloat(order.quantity),
      deliveredAmount: 0,
    };
  }

  const amounts = {
    totalAmount: 0,
    deliveredAmount: 0,
    onSiteAmount: 0,
    transitAmount: 0,
    productionAmount: 0,
  };

  order.delivery.forEach((delivery) => {
    if (delivery.quantity) {
      const amount = parseFloat(delivery.quantity);
      const mapped = mapBackendStatus(delivery.status);

      if (mapped === DELIVERY_STATUS.PRODUCTION)
        amounts.productionAmount += amount;
      if (mapped === DELIVERY_STATUS.TRANSIT) amounts.transitAmount += amount;
      if (mapped === DELIVERY_STATUS.ONSITE) amounts.onSiteAmount += amount;
      if (mapped === DELIVERY_STATUS.DELIVERED)
        amounts.deliveredAmount += amount;
    }
  });

  amounts.totalAmount = parseFloat(order.quantity);

  return amounts;
};

const getDoesOrderHaveAnyCarsOnSite = (order) => {
  if (order.delivery && order.delivery.length > 0) {
    const {delivery} = order;
    for (let i = 0; i < delivery.length; i++) {
      const status = mapBackendStatus(delivery[i].status);
      if (status === DELIVERY_STATUS.ONSITE) return true;
    }
  }
  return false;
};

const getDeliveryEtaFromPlannedTime = (plannedTime) => {
  if (!plannedTime) return null;

  const parsedTimeString = plannedTime.split(':');

  if (parsedTimeString.length < 2) return null;

  const plannedHour = parseInt(parsedTimeString[0], 10);
  const plannedMinutes = parseInt(parsedTimeString[1], 10);
  const plannedDate = new Date();
  const today = new Date();
  plannedDate.setHours(plannedHour);
  plannedDate.setMinutes(plannedMinutes);
  if (plannedDate.valueOf() > today.valueOf()) {
    var differenceFromNowInMinutes =
      (plannedDate.getTime() - today.getTime()) / 1000 / 60;

    return Math.abs(Math.round(differenceFromNowInMinutes));
  }

  return null;
};

const getFastestEtaOfDeliveryForOrder = (order) => {
  let minEta = null;
  if (order.delivery && order.delivery.length > 0) {
    const {delivery} = order;
    for (let i = 0; i < delivery.length; i++) {
      const status = mapBackendStatus(delivery[i].status);
      if (status === DELIVERY_STATUS.TRANSIT) {
        if (!minEta || minEta > delivery[i].eta) minEta = delivery[i].eta;
      } else if (!delivery[i].tikslas_id && delivery[i].delivery_time) {
        const plannedEta = getDeliveryEtaFromPlannedTime(
          delivery[i].delivery_time,
        );
        if (plannedEta && (minEta > plannedEta || !minEta)) minEta = plannedEta;
      }
    }
  }
  return minEta;
};

const mapOngoingOrder = (order) => ({
  address: order.address,
  branch: order.branch, // Ask if branch == factory :)
  comment: order.comment,
  date: order.data,
  formattedDate: order.dataFormatted,
  deliveryProgress: order.deliveries,
  id: order.id,
  map: order.mapas, // Ask what this is
  price: order.order_price,
  productName: order.product,
  quantity: order.quantity,
  salesPerson: order.user,
  orderedBy: order.uzs_pateike,
  orderQuantity:order.ordered_qty,
  deliveredQuantity:order.delivered_qty,
  db: order.db,
  startTime: order.start,
  endTime: order.end,
  hasDeliveriesOnsite: getDoesOrderHaveAnyCarsOnSite(order),
  nextDeliveryComingInMins: getFastestEtaOfDeliveryForOrder(order),
  deliveryAmounts: getAmountsFromOngoingOrder(order),
  deliveries: order?.delivery?.map((delivery) => ({
    licensePlate: delivery.cars,
    completed: delivery.completed,
    db: delivery.db, // what is this
    id: delivery.id,
    map: delivery.mapas, // Ask what this is
    invoice: delivery.invoice,
    productName: delivery.product,
    quantity: delivery.quantity,
    contact: delivery.salytis, // ask what this is and how should it be translated
    fluidity: delivery.slankumas, // ask what this is and how should it be translated
    destinationId: delivery.tikslas_id,
    vaztar: delivery.vaztar, // ask what is difference between invoice and vaztarastis and how to translate
    x: delivery.x, // Use to show car on graph
    y: delivery.y,
    signed: delivery.signed,
  })),
});

const mapOngoingOrdersResponse = (response) => {
  const mappedResponse = {orders: []};
  if (response.item) {
    response.item.forEach((order) => {
      mappedResponse.orders.push(mapOngoingOrder(order));
    });
  }

  return mappedResponse;
};

const formatDate = (deliveryDate) => {
  const formatNumber = (val) => {
    if (val < 10) return `0${val}`;
    return val;
  };

  const month = deliveryDate.getMonth() + 1;
  const day = deliveryDate.getDate();
  const hour = deliveryDate.getHours();
  const minutes = deliveryDate.getMinutes();

  return `${deliveryDate.getFullYear()}-${formatNumber(month)}-${formatNumber(
    day,
  )} ${formatNumber(hour)}:${formatNumber(minutes)}`;
};

const formatDateWithoutTime = (deliveryDate) => {
  const formatNumber = (val) => {
    if (val < 10) return `0${val}`;
    return val;
  };

  const month = deliveryDate.getMonth() + 1;
  const day = deliveryDate.getDate();

  return `${deliveryDate.getFullYear()}-${formatNumber(month)}-${formatNumber(
    day,
  )}`;
};

const mapCreateOrderRequest = (request) => {
  const deliveryDate = new Date(request.date);
  deliveryDate.setHours(request.time.hours);
  deliveryDate.setMinutes(request.time.minutes);

  return {
    mixture: request.product.id,
    quantity: request.amount,
    address: request.location.address ?? request.object.addressName,
    interval: request.interval,
    factory: request.object.branchId,
    clientTransport: request.ownTransport ? 1 : 0,
    pump: request.pump.value,
    comment: request.comment ?? '',
    ordDate: formatDate(deliveryDate),
    latitude: request.location.coordinates.latitude,
    longitude: request.location.coordinates.longitude,
    latakas: request.isHydraulicChuteRequired ? 1 : 0,
  };
};

const mapPricePreviewRequest = (request) => {
  if (!request) return null;
  const deliveryDate = new Date(request.date);
  deliveryDate.setHours(request.time.hours);
  deliveryDate.setMinutes(request.time.minutes);

  return {
    mixture: request.product.id,
    quantity: request.amount,
    address: request.location.address ?? request.object.addressName,
    interval: request.interval,
    factory: request.object.branchId,
    clientTransport: request.ownTransport ? 1 : 0,
    pump: request.pump.value,
    comment: request.comment ?? '',
    ordDate: formatDate(deliveryDate),
    latitude: request.location.coordinates.latitude,
    longitude: request.location.coordinates.longitude,
    latakas: request.isHydraulicChuteRequired ? 1 : 0,
  };
};

const getUnloadingEndForHistoricalDelivery = (delivery) => {
  if (!delivery || !delivery.timeline) return null;

  const unloadingTimeline = delivery.timeline.find(
    (val) => val.status === UNLOADING_STATUS_IN_HISTORIC_DELIVERY,
  );
  if (!unloadingTimeline || !unloadingTimeline.time) return null;

  const unloadingDate = new Date(unloadingTimeline.time);
  const unloadingTime = formatDisplayTime(
    unloadingDate.getHours(),
    unloadingDate.getMinutes(),
  );

  return unloadingTime;
};

const mapOrdersResponse = (response) => {
  const mappedResponse = {orders: []};
  if (response.item) {
    response.item.forEach((order) => {
      mappedResponse.orders.push({
        address: order.address,
        branch: order.branch,
        comment: order.comment,
        date: order.data,
        formattedDate: order.dataFormatted,
        db: order.db,
        deliveredAmount: order.delivered,
        deliveryProgress: order.deliveries,
        invoiceId: order.f_id,
        id: order.id,
        orderQuantity:order.ordered_qty,
        deliveredQuantity:order.delivered_qty,
        price: order.order_price,
        productName: order.product,
        quantity: order.quantity,
        salesPerson: order.user,
        orderedBy: order.uzs_pateike,
        startTime: order.start,
        endTime: order.end,
        plannedTime: order.time,
        plannedEndTime: order.t_end,
        unsignedDocumentCount:
          order?.delivery?.filter((delivery) => !delivery.signed).length ?? 0,
        deliveries: order?.delivery?.map((delivery) => ({
          licensePlate: delivery.cars,
          db: delivery.db,
          id: delivery.id,
          deliveryId: delivery.deliveryId, // whats the difference with id
          information: delivery.information, // what information is this
          invoice: delivery.invoice,
          orderId: delivery.orderId,
          productName: delivery.product,
          quantity: delivery.quantity,
          fluidity: delivery.slankumas,
          destinationId: delivery.tikslas_id,
          vaztar: delivery.vaztar,
          x: delivery.x,
          y: delivery.y,
          signed: delivery.signed,
           plant: {
              temperature: delivery.plant?.temperature ?? null,
              slump: delivery.plant?.slump ?? null,
            },
            onSite: {
              temperature: delivery.onSite?.temperature ?? null,
              slump: delivery.onSite?.slump ?? null,
            },

          isCarWithPump: delivery.pump === '1',
          deliveryStart: delivery.salytis,
          deliveryEnd: delivery.delivery_time,
          unloadingEnd: getUnloadingEndForHistoricalDelivery(delivery),
        })),
      });
    });
  }

  return mappedResponse;
};

const mapPendingOrderStatus = (status) => {
  if (!status) return null;
  const parsedStatus = parseInt(status, 10);

  if (parsedStatus === -1) return PENDING_ORDER_STATUS.PENDING;
  if (parsedStatus === 0) return PENDING_ORDER_STATUS.APPROVED;
  return null;
};

const mapPendingOrdersResponse = (response) => {
  const mappedResponse = {orders: []};
  if (response.item) {
    response.item.forEach((order) => {
      mappedResponse.orders.push({
        address: order.address,
        branch: order.branch,
        comment: order.comment,
        date: order.data,
        formattedDate: order.dataFormatted,
        db: order.db, // what is this
        deliveredAmount: order.delivered,
        deliveryProgress: order.deliveries,
        invoiceId: order.f_id,
        id: order.id,
        orderQuantity:order.ordered_qty,
        deliveredQuantity:order.delivered_qty,
        price: order.order_price,
        productName: order.product,
        quantity: order.quantity,
        salesPerson: order.user,
        interval: order.interval,
        objectId: order.object_id,
        pumpValue: order.pumpValue,
        orderedBy: order.uzs_pateike,
        startTime: order.start,
        endTime: order.end,
        plannedTime: order.time,
        isHydraulicChuteRequired: order.latakas === 1 ? true : false,
        status: mapPendingOrderStatus(order.status),
        deliveries: order?.delivery?.map((delivery) => ({
          licensePlate: delivery.cars,
          db: delivery.db,
          id: delivery.id,
          deliveryId: delivery.deliveryId, // whats the difference with id
          information: delivery.information, // what information is this
          invoice: delivery.invoice,
          orderId: delivery.orderId,
          productName: delivery.product,
          quantity: delivery.quantity,
          contact: delivery.salytis, // ask what this is and how should it be translated
          fluidity: delivery.slankumas, // ask what this is and how should it be translated
          destinationId: delivery.tikslas_id,
          vaztar: delivery.vaztar, // ask what is difference between invoice and vaztarastis and how to translate
          x: delivery.x, // ask what these coordinates are for
          y: delivery.y, // ask what these coordinates are for
          signed: delivery.signed,
        })),
      });
    });
  }

  return mappedResponse;
};

const mapOrderCountsResponse = (response) => {
  return {
    ongoingOrderCount: response.ongoing_orders_count,
    historyOrderCount: response.order_history_count,
    pendingOrderCount: response.pending_orders_count,
    orderHistoryNotSigned: response.order_history_not_signed,
  };
};

const mapUserData = (response) => {
  return {
    id: response.id,
    companyId: response.client_id,
    companyName: response.company,
    companyCode: response.company_code,
    email: response.email,
    username: response.login,
    name: response.name,
    surname: response.surname,
    phone: response.tel,
  };
};

const mapSupportContacts = (response) => response;

const mapSingleObject = (objectFromApi) => {
  const object = {
    id: objectFromApi.id,
    addressName: objectFromApi.objekto_adresas,
    coordinates: {
      longitude: objectFromApi.longitude,
      latitude: objectFromApi.latitude,
    },
    totalAmount: objectFromApi.objekto_bendras_kiekis,
    startDate: objectFromApi.objekto_pradzia,
    contact: {
      name: objectFromApi.klientas_kontaktas,
      phone: objectFromApi.klientas_telefonas,
      email: objectFromApi.klientas_emailas,
    },
    branchId: objectFromApi.branch,
    availableProducts: objectFromApi.product
      ? objectFromApi.product.map((product) => {
          const {name, subText} = parseProductName(product.product);
          return {
            id: product.product_id,
            name: name,
            subText: subText,
            quantity: product.kiekis,
          };
        })
      : [],
    availablePumps: objectFromApi.pumps
      ? objectFromApi.pumps.map((pump) => ({
          id: pump.pump_id,
          name: pump.name,
        }))
      : [],
    previousOrdersCoordinates: objectFromApi.coord,
    maximumAmountToOrder: objectFromApi.total ?? 50,
  };

  return object;
};

const mapObjects = (response) => {
  const result = [];
  if (response) {
    response.objects.forEach((object) => {
      result.push(mapSingleObject(object));
    });
  }

  return result;
};

const mapProducts = (response) =>{
  const result = [];
  if (response) {
    response.product.forEach((product) => {
      const {name, subText} = parseProductName(product.product);
      result.push({
        id: product.product_id,
        name: name,
        subText: subText,
      });
    });
  }

  return result;
}

const mapObject = (response) => mapSingleObject(response);

const mapOngoingOrderResponse = (order) => {
  return {
    deliveryAmounts: getAmountsFromOngoingOrder(order),
    timelineData: createDeliveryDatasetForTimeline(order) ?? [],
    mapData: createDatasetForMapTracking(order),
  };
};

const mapEditOrderRequest = (data) => {
  const request = {db: data.db};

  if (data.amount) request.quantity = data.amount;
  if (data.date) {
    const deliveryDate = new Date(data.date);
    deliveryDate.setHours(data.time.hours);
    deliveryDate.setMinutes(data.time.minutes);

    request.ordDate = formatDate(deliveryDate);
  }

  return request;
};

const mapCoworkerResponse = (response) => {
  if (!response || !response.users) return [];

  return response.users.map((coworker) => ({
    id: coworker.id,
    name: coworker.name,
    phone: coworker.tel,
  }));
};

const mapFiltersRequest = (request) => {
  const {customerId, startDate, endDate, objectId} = request;
  const response = {};
  if (customerId) response.customerId = request.customerId;
  if (endDate && startDate) {
    response.startDate = formatDateWithoutTime(startDate);
    response.endDate = formatDateWithoutTime(endDate);
  }
  if (objectId) response.objectId = objectId;

  return response;
};

const mapMonthNumberToLabel = (monthNumber) => {
  switch (monthNumber) {
    case '1':
      return 'S';
    case '2':
      return 'V';
    case '3':
      return 'K';
    case '4':
      return 'B';
    case '5':
      return 'G';
    case '6':
      return 'B';
    case '7':
      return 'L';
    case '8':
      return 'R';
    case '9':
      return 'R';
    case '10':
      return 'S';
    case '11':
      return 'L';
    case '12':
      return 'G';
    default:
      return null;
  }
};

const mapGraphsResponse = (response) => {
  if (!response || !response.month || Object.keys(response.month).length < 1)
    return null;

  const {avg, month} = response;
  let bars = [];
  Object.keys(month)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach((monthNumber) => {
      const label = mapMonthNumberToLabel(monthNumber);
      bars.push({value: month[monthNumber], label});
    });

  bars = bars.filter((m) => m.label !== null && !isNaN(parseInt(m.value)));
  const line = bars.map(() => ({value: avg}));

  if (bars.length < 1) return null;

  return {bars, line};
};

const mapClassessResponse = (response) => {
  if (!response) return [];

  return response;
};

const ApiDataMapper = {
  mapRegisterRequest,
  mapRegisterResponse,
  mapLoginResponse,
  mapLoginRequest,
  mapMixturesAndPumpsResponse,
  mapFactoriesResponse,
  mapOngoingOrdersResponse,
  mapCreateOrderRequest,
  mapOrdersResponse,
  mapOrderCountsResponse,
  mapUserData,
  mapSupportContacts,
  mapObjects,
  mapObject,
  mapProducts,
  mapPendingOrdersResponse,
  mapPricePreviewRequest,
  mapOngoingOrderResponse,
  mapEditOrderRequest,
  mapCoworkerResponse,
  mapFiltersRequest,
  mapGraphsResponse,
  mapClassessResponse,
  mapUserExistsResponse
};

export {ApiDataMapper};
