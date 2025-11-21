import React from 'react';
import {Image, View, StatusBar, TouchableOpacity} from 'react-native';
import logo from '../../../assets/logo.png';
import styles from './MapHeader.styles';
import {BackIconSvg} from '../../../assets/icons';

const MapHeader = ({children, menuItem, onBackPress, footer}) => {
  return (
    <View style={styles.rootContainer}>
      <StatusBar hidden />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBackPress}>
          <BackIconSvg {...styles.backButton} />
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
        {menuItem && menuItem}
      </View>
      <View style={styles.container}>{children}</View>
      {footer}
    </View>
  );
};

export {MapHeader};
