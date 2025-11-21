import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './MenuButton.styles';
import {Loader} from '../../../../components';
import {ArrowRightSvg} from '../../../../assets/icons';

const MenuButton = ({onPress, header, subText, Icon, isLoading,innerText}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.container}
    disabled={isLoading}
  >
    {!isLoading && (
      <>
        <View style={styles.titleContainer}>
          <Icon {...styles.icon} />
          <View>
            <Text style={styles.header}>{header}</Text>
            {subText && <Text style={styles.subText}>{subText}</Text>}
           
          </View>
          {innerText && <View style={styles.roundedView}><Text style={styles.circleText}>{innerText}</Text></View>}
        </View>
        <ArrowRightSvg {...styles.linkIcon} />
      </>
    )}
    {isLoading && (
      <View style={styles.loaderContainer}>
        <Loader size="large" />
      </View>
    )}
  </TouchableOpacity>
);

export {MenuButton};
