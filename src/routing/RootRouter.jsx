import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthenticatedAppRouter} from './AuthenticatedAppRouter';
import {UnauthenticatedAppRouter} from './UnauthenticatedAppRouter';
import {AuthContext} from '../context/AuthProvider';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RootRouter = () => {
  const {session} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {session.access_token != null ? (
        <AuthenticatedAppRouter StackReference={Stack} />
      ) : (
        <UnauthenticatedAppRouter StackReference={Stack} />
      )}
    </NavigationContainer>
  );
};

export {RootRouter};
