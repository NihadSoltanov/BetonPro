import React from 'react';
import {View} from 'react-native';
import styles from './DateInputButton.styles';
import {Button} from '../../../../../../components/Buttons';

const DateInputButton = ({label, variant, onPress}) => {
  return (
    <View>
      <Button
        label={label}
        variant={variant}
        textStyle={styles.dateButtonText}
        onPress={onPress}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export {DateInputButton};
