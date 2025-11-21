import React from 'react';
import {
  Home,
  NewOrder,
  OrderHistory,
  OrderTracking,
  PendingOrders,
  NewOrderPreview,
} from '../screens';
import {ErrorScreen} from '../screens/Error/ErrorScreen';
import {LocationSelector} from '../screens/LocationSelector/LocationSelector';
import {MapTracking} from '../screens/MapTracking/MapTracking';
import {Profile} from '../screens/Profile/Profile';
import {ROUTES} from './routes';
import {EditOrder} from '../screens/EditOrder/EditOrder';
import {FilterScreen} from '../screens/FilterScreen/FilterScreen';

const AuthenticatedAppRouter = ({StackReference}) => (
  <StackReference.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#008d45',
      },
      headerBackVisible: false,
    }}
  >
    <StackReference.Screen
      name={ROUTES.HOME}
      component={Home}
      options={() => ({
        headerShown: false, // Remove header from HomeScreen
      })}
    />
    <StackReference.Screen
      name={ROUTES.NEW_ORDER}
      component={NewOrder}
      options={{
        headerShown: false, // This will hide the original header
      }}
    />
    <StackReference.Screen
      name={ROUTES.ORDER_HISTORY}
      component={OrderHistory}
      options={{
        headerShown: false, // This will hide the original header
      }}
    />

    <StackReference.Screen
      name={ROUTES.ORDER_TRACKING}
      component={OrderTracking}
      options={{
        headerShown: false, // This will hide the original header
      }}
    />
    <StackReference.Screen
      name={ROUTES.PROFILE}
      component={Profile}
      options={() => ({
        headerShown: false,
      })}
    />
    <StackReference.Screen
      name={ROUTES.LOCATION_SELECTOR}
      component={LocationSelector}
      options={() => ({
        headerShown: false,
      })}
    />
    <StackReference.Screen
      name={ROUTES.PENDING_ORDERS}
      component={PendingOrders}
      options={() => ({
        headerShown: false, // Remove header from HomeScreen
      })}
    />
    <StackReference.Screen
      name={ROUTES.NEW_ORDER_PREVIEW}
      component={NewOrderPreview}
      options={() => ({
        headerShown: false, // Remove header from HomeScreen
      })}
    />
    <StackReference.Screen
      name={ROUTES.MAP_TRACKING}
      component={MapTracking}
      options={() => ({
        headerShown: false, // Remove header from HomeScreen
      })}
    />
    <StackReference.Screen
      name={ROUTES.ERROR}
      component={ErrorScreen}
      options={() => ({
        headerShown: false, // Remove header from HomeScreen
      })}
    />
    <StackReference.Screen
      name={ROUTES.EDIT_ORDER}
      component={EditOrder}
      options={() => ({
        headerShown: false, // Remove header from HomeScreen
      })}
    />
    <StackReference.Screen
      name={ROUTES.FILTER}
      component={FilterScreen}
      options={() => ({
        headerShown: false, // Remove header from HomeScreen
      })}
    />
  </StackReference.Navigator>
);

export {AuthenticatedAppRouter};
