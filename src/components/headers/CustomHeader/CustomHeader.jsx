import React from 'react';
import {
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import headerImage from '../../../assets/rectangle.png';
import stairs from '../../../assets/stairs.png';
import brandLogo from '../../../assets/logo.png';
import {Ionicons} from '@expo/vector-icons';
import styles from './CustomHeader.styles';

const CustomHeader = ({title, navigation}) => (
  <ImageBackground
    source={stairs}
    style={{width: '100%', height: 260, position: 'absolute', top: 0}}
  >
    <ImageBackground
      source={headerImage}
      style={{
        width: '100%',
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={brandLogo}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          {title === 'New Order Screen' ? 'Add New Order' : title}
        </Text>
      </View>
    </ImageBackground>
  </ImageBackground>
);

export {CustomHeader};
