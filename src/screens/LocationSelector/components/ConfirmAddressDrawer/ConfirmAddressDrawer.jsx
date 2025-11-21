import React from 'react';
import {Text, View} from 'react-native';
import styles from './ConfirmAddressDrawer.styles';
import {BottomDrawer, Button, Loader} from '../../../../components';
import { useTranslate } from '../../../../hooks/useTranslate';

const ConfirmAddressDrawer = ({
  onSubmit,
  onClose,
  isVisible,
  title,
  address,
  isLoading,
}) => {
  const { t} = useTranslate();
  return (
    <BottomDrawer isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {address && <Text style={styles.address}>{address}</Text>}
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button variant="outlined" onPress={onClose} label={t('locationselector.confirmAddressDrawer.cancel')}/>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  variant="solid"
                  onPress={onSubmit}
                  label={t('locationselector.confirmAddressDrawer.confirm')}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </BottomDrawer>
  );
};

export {ConfirmAddressDrawer};
