import React, {useState} from 'react';
import {Text, TouchableOpacity, ScrollView, View} from 'react-native';
import {CustomModal as Modal} from '../../../../components/Modal/Modal';
import {HighlightText} from '../HighlightText/HighlightText';
import styles from './PumpSelectorSection.styles';
import { useTranslate } from '../../../../hooks/useTranslate';


const PumpSelectorSection = ({items, onSelect, value, disabled}) => {
  const { t} = useTranslate();
  const [isIntervalSelectorVisible, setIsIntervaltSelectorVisible] =
    useState(false);

  const onClose = () => {
    setIsIntervaltSelectorVisible(false);
  };

  const handleItemSelect = (item) => {
    onSelect(item);
    onClose();
  };

  return (
    <>
      <HighlightText
        text={value?.label}
        placeholder={t('filter_form.choose')}
        onPress={() => setIsIntervaltSelectorVisible(true)}
        disabled={disabled}
      />
      <Modal isVisible={isIntervalSelectorVisible} onClose={onClose}>
        <ScrollView>
          <View>
            {items?.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleItemSelect(item)}
                disabled={disabled}
              >
                <Text style={styles.inputValue}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export {PumpSelectorSection};
