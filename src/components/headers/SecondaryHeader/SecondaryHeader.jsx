import React from 'react';
import {Image, View, StatusBar, Text, TouchableOpacity} from 'react-native';
import logo from '../../../assets/logo.png';
import styles from './SecondaryHeader.styles';
import stairs from '../../../assets/backgrounds/stairs.png';
import rectangle from '../../../assets/backgrounds/rectangle.png';
import {BackIconSvg} from '../../../assets/icons';
import {ScrollView} from 'react-native-gesture-handler';

const SecondaryHeader = ({
  children,
  menuItem,
  title,
  onBackPress,
  footer,
  disableScroll,
  action,
  style,
  subHeader,
}) => {
  const RootWrapper = disableScroll ? View : ScrollView;
  return (
    <View style={styles.rootContainer}>
      <RootWrapper style={{flex: 1}}>
        <Image source={stairs} style={styles.image} />
        <Image source={rectangle} style={styles.image} />
        <StatusBar hidden />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBackPress}>
            <BackIconSvg {...styles.backButton} />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
          {menuItem && menuItem}
        </View>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.title}>{title}</Text>
          {action && action}
        </View>
        {subHeader && (
          <View style={styles.subHeaderContainer}>{subHeader}</View>
        )}
        <View style={[styles.container, style && style]}>{children}</View>
      </RootWrapper>
      {footer}
    </View>
  );
};

export {SecondaryHeader};
