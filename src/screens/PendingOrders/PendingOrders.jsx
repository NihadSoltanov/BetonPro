import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, FlatList,SafeAreaView} from 'react-native';
import API from '../../api/API';
import {
  SecondaryHeader,
  ProfileButton,
  ConfirmModal,
  FilterButton,
  NoOrders,
  Pill,
} from '../../components';
import {PendingOrderItem} from './components';
import {useOrderCollapse} from '../../hooks/useOrderCollapse';
import {ROUTES} from '../../routing/routes';
import {useCancelOrder} from '../../hooks/data';
import {FilterContext} from '../../context/FilterProvider';
import { useTranslate } from '../../hooks/useTranslate';
import ManagerModal from '../../components/ManagerModal';

const PendingOrders = ({navigation}) => {
  const { t} = useTranslate();
  const [pendingOrders, setPendingOrders] = useState([]);
  const {selectedId, setSelectedId, ref} = useOrderCollapse(pendingOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const {cancelOrder, isLoading: isLoadingCancelOrder} = useCancelOrder();

  const onEditPress = (id) => {
    const editableOrder = pendingOrders.find((order) => order.id === id);
    if (editableOrder) {
      navigation.navigate(ROUTES.EDIT_ORDER, {order: editableOrder});
    }
  };
  const {filters, actions, isFiltered} = useContext(FilterContext);
const [managerModal, setManagerModal] = useState({
  visible: false,
  name: '',
  phone: '',
});

  const renderItem = React.useCallback(
    ({item}) => {
      return (
       <PendingOrderItem
         item={item}
         deliveryId={item.deliveryId}
         isOpen={selectedId === item.id}
         onPress={() => setSelectedId(item.id)}
         onCancelPress={() => setIsCancelVisible(true)}
         onEditPress={onEditPress}
         onManagerPress={(name, phone) => {
           console.log('PENDING MANAGER:', name, phone);
           setManagerModal({
             visible: true,
             name,
             phone,
           });
         }}
       />

      );
    },
    [setSelectedId, selectedId],
  );

  const getPendingOrders = useCallback(() => {
    setIsLoading(true);
    API.getPendingOrders(filters).then((res) => {
      if (Array.isArray(res.orders)) {
        setPendingOrders(res.orders);
      } else {
        setPendingOrders([]);
      }
      setIsLoading(false);
    });
  }, [filters]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPendingOrders();
    });

    return unsubscribe;
  }, [navigation, getPendingOrders]);

  const handleRefresh = () => {
    getPendingOrders();
  };

  const handleCancelOrder = () => {
    const order = pendingOrders.find((order) => order.id === selectedId);
    if (order) {
      cancelOrder({orderId: order.id, dbId: order.db}, () => {
        setIsCancelVisible(false);
        getPendingOrders();
      });
    }
  };

  useEffect(() => {
    return () => {
      actions.resetFiltering();
    };
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
    <SecondaryHeader
      disableScroll
      title={t('pending_orders_form.pending_orders')}
      menuItem={
        <ProfileButton onPress={() => navigation.navigate(ROUTES.PROFILE)} />
      }
      onBackPress={() => navigation.goBack()}
      action={
        <View>
          <FilterButton onPress={() => navigation.navigate(ROUTES.FILTER)} />
        </View>
      }
      subHeader={
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {Object.values(filters.filterLabels)
            .filter((val) => val)
            .map((filter) => (
              <Pill text={filter} key={filter} />
            ))}
        </View>
      }
    >
      <FlatList
        ref={ref}
        data={pendingOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{height: 25}} />}
        ListEmptyComponent={
          isLoading ? (
            <></>
          ) : (
            <NoOrders
              isFiltered={isFiltered}
              defaultText={t('pending_orders_form.no_pending_order')}
            />
          )
        }
      />
      <ConfirmModal
        isOpen={isCancelVisible}
        onClose={() => setIsCancelVisible(false)}
        onConfirm={handleCancelOrder}
        title={t('pending_orders_form.delete_order_message')}
        text={t('pending_orders_form.confirm_to_proceed')}
        cancelButtonText={t('pending_orders_form.cancel')}
        confirmButtonText={t('pending_orders_form.delete')}
        isLoading={isLoadingCancelOrder}
      />
      <ManagerModal
        visible={managerModal.visible}
        name={managerModal.name}
        phone={managerModal.phone}
        onClose={() =>
          setManagerModal(prev => ({ ...prev, visible: false }))
        }
      />

    </SecondaryHeader>
    </SafeAreaView>
  );
};

export {PendingOrders};
