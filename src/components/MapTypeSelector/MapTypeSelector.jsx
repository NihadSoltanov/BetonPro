import React from 'react';
import {Text, View} from 'react-native';
import styles from './MapTypeSelector.styles';
import satelliteMap from '../../assets/images/satelliteMap.png';
import standardMap from '../../assets/images/standardMap.png';
import {MapTypeButton} from '../MapTypeButton/MapTypeButton';
import {MAP_TYPES} from '../../config';
import {BottomDrawerWithOverlay} from '../BottomDrawerWithOverlay/BottomDrawerWithOverlay';
import { useTranslate } from '../../hooks/useTranslate';

const MapTypeSelector = ({active, onChange, onClose, isVisible}) => {
  const { t} = useTranslate();
  return (
    <BottomDrawerWithOverlay isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('components.map_type_selection.map_type')} </Text>
        <View style={styles.buttonContainer}>
          <MapTypeButton
            imageUrl={standardMap}
            active={active === MAP_TYPES.STANDARD}
            text={t('components.map_type_selection.map')}
            onPress={() => onChange(MAP_TYPES.STANDARD)}
          />
          <MapTypeButton
            imageUrl={satelliteMap}
            active={active === MAP_TYPES.SATELLITE}
            text={t('components.map_type_selection.satellite')}
            onPress={() => onChange(MAP_TYPES.SATELLITE)}
          />
        </View>
      </View>
    </BottomDrawerWithOverlay>
  );
};

export {MapTypeSelector};
