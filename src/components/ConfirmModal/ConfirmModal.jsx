import React from 'react';
import {Text, View} from 'react-native';
import {CustomModal} from '../Modal/Modal';
import {Button} from '../Buttons';
import styles from './ConfirmModal.styles';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title,
  text,
  confirmButtonText,
  cancelButtonText,
}) => {
  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <Text style={styles.title}>{title}</Text>
      {text && <Text style={styles.text}>{text}</Text>}
      <View style={styles.buttonsContainer}>
        <View flex={1}>
          <Button
            onPress={onClose}
            label={cancelButtonText}
            variant="outlined"
            loading={isLoading}
          />
        </View>
        <View flex={1}>
          <Button
            onPress={onConfirm}
            label={confirmButtonText}
            variant="danger"
            loading={isLoading}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export {ConfirmModal};
