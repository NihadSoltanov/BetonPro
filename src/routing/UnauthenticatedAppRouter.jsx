import React from 'react';
import { Login } from '../screens';
import { Register } from '../screens/Register/Register';
import { ForgotPassword } from '../screens/ForgotPassword/ForgotPassword';
import { ROUTES } from './routes';

const UnauthenticatedAppRouter = ({ StackReference }) => (
  <StackReference.Navigator>

    {/* ✅ LOGIN */}
    <StackReference.Screen
      name={ROUTES.LOGIN}
      component={Login}
      options={{ headerShown: false }}
    />

    {/* ✅ REGISTER */}
    <StackReference.Screen
      name={ROUTES.REGISTER}
      component={Register}
      options={{ headerShown: false }}
    />

    {/* ✅ FORGOT PASSWORD */}
    <StackReference.Screen
      name={ROUTES.FORGOT_PASSWORD}
      component={ForgotPassword}
      options={{ headerShown: false }}
    />

  </StackReference.Navigator>
);

export { UnauthenticatedAppRouter };
