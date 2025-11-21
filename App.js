import React,{useState,useEffect,useCallback} from 'react';
import {View } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {AuthProvider} from './src/context/AuthProvider';
import {RootRouter} from './src/routing/RootRouter';
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import {FilterProvider} from './src/context/FilterProvider';
import * as Font from 'expo-font';
import './src/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins: Poppins_400Regular,
          Poppins_bold: Poppins_700Bold,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {     
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
    style={{ flex: 1}}
    onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{flex:1}}>
    <AuthProvider>
      <FilterProvider>
        <StatusBar backgroundColor="#008e46" />
        <RootRouter />
      </FilterProvider>
    </AuthProvider>
    </GestureHandlerRootView>
    </View>
  );
}

