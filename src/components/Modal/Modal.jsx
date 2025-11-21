import React from 'react';
import {Modal, View} from 'react-native';
import {Box} from '../Box/Box';
import styles from './Modal.styles';

const CustomModal = ({children, onClose, isVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <Box>{children}</Box>
      </View>
    </Modal>
  );
};

export {CustomModal};
