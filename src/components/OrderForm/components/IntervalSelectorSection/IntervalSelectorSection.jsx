import React, {useState} from 'react';
import {Text, TouchableOpacity, ScrollView, View} from 'react-native';
import {CustomModal as Modal} from '../../../../components/Modal/Modal';
import {HighlightText} from '../HighlightText/HighlightText';
import styles from './IntervalSelectorSection.styles';
import { IconButton } from '../../../Buttons';
import { BackIconSvg } from '../../../../assets/icons';
import { useTranslate } from '../../../../hooks/useTranslate';

const IntervalSelectorSection = ({items, onSelect, value, disabled}) => {
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

  const displayTimeValue = (time) => `${time} min`;

  return (
    <>
      <HighlightText
        text={
          value
            ? value > 0
              ? displayTimeValue(value)
              : t('components.interval_selection.arrange_by_phone')
            : null
        }
        placeholder={t('filter_form.choose')}
        onPress={() => setIsIntervaltSelectorVisible(true)}
        disabled={disabled}
      />
      <Modal isVisible={isIntervalSelectorVisible} onClose={onClose}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.label}>{t('components.interval_selection.who')}:</Text>
        <IconButton Icon={BackIconSvg} onPress={onClose} iconStyles={styles.btn}/>
        </View>
       
        <ScrollView>
          <View style={{paddingLeft:10}}>
            <TouchableOpacity onPress={() => handleItemSelect(-1)}>
              <Text style={styles.inputValue}>{t('components.interval_selection.arrange_by_phone')}</Text>
            </TouchableOpacity>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleItemSelect(item)}
              >
                <Text style={styles.inputValue}>{displayTimeValue(item)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export {IntervalSelectorSection};
