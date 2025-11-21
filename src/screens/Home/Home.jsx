import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {MenuButton} from './components';
import styles from './Home.styles';
import {
  MainHeader,
  LinkButton,
  ProfileButton,
  Button,
  SupportModal,
} from '../../components';
import {HistorySvg, LocationSvg, PendingSvg, PlusSvg} from '../../assets/icons';
import {
  useAllOrderCount,
  useUserData,
} from '../../hooks/data';
import {ROUTES} from '../../routing/routes';
import {useTranslate} from '../../hooks/useTranslate';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const {t, i18n} = useTranslate();
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const {orderCounts, isLoadingOrderCounts} = useAllOrderCount(navigation);
  const {userData, isLoadingUserData} = useUserData();

  const load = async () => {
    const language = await AsyncStorage.getItem('language');
    if (language) {
      i18n.changeLanguage(language);
    } else {
      i18n.changeLanguage('en');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MainHeader
        menuItem={
          <ProfileButton
            title={userData?.name}
            onPress={() => navigation.navigate(ROUTES.PROFILE)}
            isLoading={isLoadingUserData}
          />
        }
      >
        <View style={styles.mainContainer}>
          <View>
            <MenuButton
              onPress={() => navigation.navigate(ROUTES.ORDER_TRACKING)}
              header={t('home.order_tracking')}
              subText={
                orderCounts &&
                orderCounts.ongoingOrderCount !== null &&
                orderCounts.ongoingOrderCount !== undefined
                  ? `${orderCounts.ongoingOrderCount} ${t('home.orders_in_progress')}`
                  : ''
              }
              Icon={LocationSvg}
              isLoading={isLoadingOrderCounts}
            />

            <MenuButton
              onPress={() => navigation.navigate(ROUTES.PENDING_ORDERS)}
              header={t('home.pending_orders')}
              subText={
                orderCounts &&
                orderCounts.pendingOrderCount !== null &&
                orderCounts.pendingOrderCount !== undefined
                  ? `${orderCounts.pendingOrderCount} ${t('home.pending_orders')}`
                  : ''
              }
              Icon={PendingSvg}
              isLoading={isLoadingOrderCounts}
            />

            <MenuButton
              onPress={() => navigation.navigate(ROUTES.ORDER_HISTORY)}
              header={t('home.order_history')}
              subText={
                orderCounts &&
                orderCounts.historyOrderCount !== null &&
                orderCounts.historyOrderCount !== undefined
                  ? `${orderCounts.historyOrderCount} ${t('home.orders_fulfilled')}`
                  : ''
              }
              innerText={
                orderCounts &&
                orderCounts.orderHistoryNotSigned !== null &&
                orderCounts.orderHistoryNotSigned !== undefined
                  ? `${orderCounts.orderHistoryNotSigned}`
                  : ''
              }
              Icon={HistorySvg}
              isLoading={isLoadingOrderCounts}
            />

            <View style={styles.supportButtonContainer}>
              <LinkButton
                title={t('home.contacts')}
                onPress={() => setIsSupportModalVisible(true)}
              />
            </View>
          </View>

          <View style={styles.newOrderButtonContainer}>
            <Button
              label={t('home.new_orders')}
              variant="solid"
              Icon={PlusSvg}
              onPress={() => navigation.navigate(ROUTES.NEW_ORDER)}
            />
          </View>
        </View>

        <SupportModal
          isVisible={isSupportModalVisible}
          email="uzsakymai@hmobile.lt"
          person="Pardavimai"
          phone="+370 69002555"
          onClose={() => setIsSupportModalVisible(false)}
        />
      </MainHeader>
    </SafeAreaView>
  );
};

export {Home};
