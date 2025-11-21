import React from 'react';
import {Login} from '../screens';
import {ROUTES} from './routes';
//import { ForgotPassword } from '../screens/ForgotPassword/ForgotPassword';
//import { Register } from '../screens/Register/Register';

const UnauthenticatedAppRouter = ({StackReference}) => (
  <StackReference.Navigator>
    <StackReference.Screen
      name={ROUTES.LOGIN}
      component={Login}
      options={{headerShown: false}}
    />
  </StackReference.Navigator>
);

export {UnauthenticatedAppRouter};
