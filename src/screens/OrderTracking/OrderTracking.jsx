import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, FlatList,SafeAreaView} from 'react-native';
import API from '../../api/API';
import {
  SecondaryHeader,
  ProfileButton,
  FilterButton,
  NoOrders,
  Pill,
} from '../../components';
import {OngoingOrderItem} from './components';
import {useOrderCollapse} from '../../hooks/useOrderCollapse';
import {ROUTES} from '../../routing/routes';
import {FilterContext} from '../../context/FilterProvider';
import { useTranslate } from '../../hooks/useTranslate';

const OrderTracking = ({navigation}) => {
  const { t} = useTranslate();
  const [ongoingOrders, setOrderTracking] = useState([]);
  const {selectedId, setSelectedId, ref} = useOrderCollapse(ongoingOrders);
  const [isLoading, setIsLoading] = useState(false);

  const {filters, actions, isFiltered} = useContext(FilterContext);

  const getOngoingOrders = useCallback(() => {
    setIsLoading(true);
    API.getOngoingOrders(filters).then((res) => {
      if (Array.isArray(res.orders)) {
        setOrderTracking(res.orders);
      } else {
        setOrderTracking([]);
      }
      setIsLoading(false);
    });
  }, [filters]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOngoingOrders();
    });

    return unsubscribe;
  }, [navigation, getOngoingOrders]);

  const handleRefresh = useCallback(() => {
    getOngoingOrders();
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <OngoingOrderItem
          item={item}
          deliveryId={item.deliveryId}
          isOpen={selectedId === item.id}
          onPress={() => setSelectedId(item.id)}
          onRefresh={handleRefresh}
        />
      );
    },
    [setSelectedId, selectedId, handleRefresh],
  );

  useEffect(() => {
    return () => {
      actions.resetFiltering();
    };
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
    <SecondaryHeader
      disableScroll
      title={t('order_tracking_form.order_tracking')}
      menuItem={
        <ProfileButton onPress={() => navigation.navigate(ROUTES.PROFILE)} />
      }
      onBackPress={() => navigation.goBack()}
      action={
        <View>
          <FilterButton
            onPress={() =>
              navigation.navigate(ROUTES.FILTER, {disableDate: true})
            }
          />
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
        data={ongoingOrders}
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
              defaultText={t('order_tracking_form.no_orders')}
            />
          )
        }
      />
    </SecondaryHeader>
    </SafeAreaView>
  );
};

export {OrderTracking};
