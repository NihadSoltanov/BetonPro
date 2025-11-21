import React from 'react';
import {Modal, View} from 'react-native';
import styles from './BottomDrawerWithOverlay.styles';
import {BottomDrawer} from '../BottomDrawer/BottomDrawer';

const BottomDrawerWithOverlay = ({children, onClose, isVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <BottomDrawer onClose={onClose} isVisible={isVisible}>
          {children}
        </BottomDrawer>
      </View>
    </Modal>
  );
};

export {BottomDrawerWithOverlay};
