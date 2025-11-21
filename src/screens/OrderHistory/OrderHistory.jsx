import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import API from '../../api/API';
import {ProfileButton, NoOrders} from '../../components';
import {
  OrderHistoryItem,
  InvoiceDrawer,
  WaybillDrawer,
  HistoryAmountGraph,
  OrderListHeader,
} from './components';
import {ROUTES} from '../../routing/routes';
import {FilterContext} from '../../context/FilterProvider';
import styles from './OrderHistory.styles';
import {BackIconSvg} from '../../assets/icons';
import logo from '../../assets/logo.png';
import stairs from '../../assets/backgrounds/stairs.png';
import rectangle from '../../assets/backgrounds/rectangle.png';
import {SPACING} from '../../styles/theme';
import { useGraphsData } from '../../hooks/data/useGraphsData';
import { useTranslate } from '../../hooks/useTranslate';

const OrderHistory = ({navigation}) => {
  const { t} = useTranslate();
  const [selectedId, setSelectedId] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [isEndReached, setIsEndReached] = useState(false);
  const {isLoadingGraphData,graphData} = useGraphsData();
  const {filters, actions, isFiltered} = useContext(FilterContext);

  const renderItem = React.useCallback(
    ({item}) => {
      return (
        <OrderHistoryItem
          item={item}
          deliveryId={item.deliveryId}
          isOpen={selectedId === item.id}
          onPress={() => setSelectedId(item.id)}
          onMorePress={(order) => setActiveOrder(order)}
          onDeliveryMorePress={(delivery) => setActiveDelivery(delivery)}
        />
      );
    },
    [setSelectedId, selectedId],
  );

  const getOrderHistory = useCallback(
    (page, limit, refresh) => {
      setIsLoading(true);
      API.getOrderHistory({page, limit, filters}).then((res) => {
        if (Array.isArray(res.orders)) {
          if (refresh) setOrderHistory(res.orders);
          else {
            if (res.orders.length === 0) setIsEndReached(true);
            else
              setOrderHistory((prevOrderHistory) => [
                ...prevOrderHistory,
                ...res.orders,
              ]);
          }
        } else {
          setOrderHistory([]);
        }
        setIsLoading(false);
      });
    },
    [filters],
  );

  const handleRefresh = () => {
    setIsEndReached(false);
    setCurrentPage(1);
    getOrderHistory(1, itemsPerPage, true);
  };

  const handleEndReached = () => {
    if (orderHistory.length > 0 && !isEndReached) {
      setCurrentPage((prevPage) => prevPage + 1);
      getOrderHistory(currentPage + 1, itemsPerPage);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentPage(1);
      setIsEndReached(false);
      getOrderHistory(1, itemsPerPage, true);
    });

    return unsubscribe;
  }, [navigation, getOrderHistory, currentPage, itemsPerPage]);

  useEffect(() => {
    return () => {
      actions.resetFiltering();
    };
  }, []);

  const handleSigningEvent = (deliveryId) => {
    setActiveDelivery(null);
    const newOrders = orderHistory.map((order) => {
      if (selectedId === order.id) {
        const tempOrder = {
          ...order,
          unsignedDocumentCount:
            order.unsignedDocumentCount > 1
              ? order.unsignedDocumentCount - 1
              : 0,
        };
        tempOrder.deliveries = tempOrder.deliveries.map((delivery) => {
          if (delivery.id === deliveryId) return {...delivery, signed: true};
          return delivery;
        });

        return tempOrder;
      }
      return order;
    });

    setOrderHistory(newOrders);
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.rootContainer}>
      <View style={[styles.container]}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={{flex: 1}}>
                <Image source={stairs} style={styles.image} />
                <Image source={rectangle} style={styles.image} />
                <StatusBar hidden />
                <View style={styles.headerContainer}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIconSvg {...styles.backButton} />
                  </TouchableOpacity>
                  <Image source={logo} style={styles.logo} />
                  <ProfileButton
                    onPress={() => navigation.navigate(ROUTES.PROFILE)}
                  />
                </View>
                <View style={styles.subHeaderContainer}>
                {!isLoadingGraphData && graphData && (
                   <Text style={styles.title}>{t('order_history_form.statistics')}</Text>
                )}
                </View>
              </View>
              <HistoryAmountGraph />
              <OrderListHeader filters={filters} />
            </>
          }
          data={orderHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          refreshing={isLoading}
          onRefresh={handleRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={{height: 25}} />}
          ListEmptyComponent={
            isLoading ? (
              <></>
            ) : (
              <View style={{marginHorizontal: SPACING.md}}>
                <NoOrders
                  isFiltered={isFiltered}
                  defaultText={t('order_history_form.no_pending_order')}
                />
              </View>
            )
          }
        />
        <InvoiceDrawer
          isVisible={!!activeOrder}
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
        <WaybillDrawer
          isVisible={!!activeDelivery}
          delivery={activeDelivery}
          onClose={() => setActiveDelivery(null)}
          onSignCallback={handleSigningEvent}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

export {OrderHistory};
