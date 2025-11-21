import React from 'react';
import {
  Image,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import logo from '../../../assets/logo.png';
import styles from './FiltersHeader.styles';
import stairs from '../../../assets/backgrounds/stairs.png';
import rectangle from '../../../assets/backgrounds/rectangle.png';
import {BackIconSvg} from '../../../assets/icons';

const FiltersHeader = ({
  children,
  menuItem,
  onBackPress,
  footer,
  disableScroll,
}) => {
  return (
    <View style={styles.rootContainer}>
      <ScrollView
        disableScroll={disableScroll}
        nestedScrollEnabled={true}
        style={styles.scrollView}
      >
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
          <Text style={styles.title}>Filtras</Text>
        </View>
        <View style={[styles.container]}>{children}</View>
      </ScrollView>
      {footer}
    </View>
  );
};

export {FiltersHeader};
