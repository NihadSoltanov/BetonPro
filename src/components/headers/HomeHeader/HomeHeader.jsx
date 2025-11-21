import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import headerLogo from '../../../assets/rectangle.png';
import styles from './HomeHeader.styles';

const windowHeight = Dimensions.get('window').height;

const HomeHeader = ({backArrow, showHeader = true}) => {
  if (!showHeader) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: windowHeight / 10,
          width: '100%',
          resizeMode: 'cover',
          marginLeft: -16,
        }}
        source={headerLogo}
      />
      {backArrow !== '' ? <View style={styles.subHead} /> : <View />}
    </View>
  );
};

export {HomeHeader};
