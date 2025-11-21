import React from 'react';
import {ImageBackground, Image, View, StatusBar} from 'react-native';
import logo from '../../../assets/logo.png';
import styles from './MainHeader.styles';
import mainBackground from '../../../assets/backgrounds/mainBackground.png';

const MainHeader = ({children, menuItem}) => {
  return (
    <ImageBackground source={mainBackground} style={styles.image}>
      <StatusBar hidden />
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
        {menuItem && menuItem}
      </View>
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
};

export {MainHeader};
