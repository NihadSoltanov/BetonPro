import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, ScrollView, View} from 'react-native';
import {CustomModal as Modal} from '../../../../components/Modal/Modal';
import {TextInput} from '../../../../components/Inputs';
import {HighlightText} from '../HighlightText/HighlightText';
import styles from './ObjectSelectorSection.styles';
import { useTranslate } from '../../../../hooks/useTranslate';
import modalStyles from '../../../SupportModal/SupportModal.styles';
import {CrossSvg} from '../../../../assets/icons';
import {IconButton} from '../../../Buttons';

const ObjectSelectorSection = ({items, onSelect, value, disabled}) => {
  const { t} = useTranslate();
  const [filteredItems, setFilteredItems] = useState(items);
  const [isObjectSelectorVisible, setIsObjectSelectorVisible] = useState(false);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const onClose = () => {
    setIsObjectSelectorVisible(false);
    setFilteredItems(items);
  };

  const handleItemSelect = (item) => {
    onSelect(item);
    onClose();
  };

  const onFilterInputChange = (query) => {
    const filtered = items.filter((item) =>
      item.addressName.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredItems(filtered);
  };

  return (
    <>
      <HighlightText
        text={value}
        placeholder={t('filter_form.choose')}
        onPress={() => setIsObjectSelectorVisible(true)}
        disabled={disabled}
      />

      <Modal isVisible={isObjectSelectorVisible} onClose={onClose}>
      <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
        <IconButton Icon={CrossSvg} onPress={onClose} />
      </TouchableOpacity>
        <TextInput
          placeholder={t('components.object_selection.object_name')}
          onValueChange={(val) => onFilterInputChange(val)}
        />
        <ScrollView>
          <View>
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleItemSelect(item)}
              >
                <Text style={styles.objectText}>{item.addressName}</Text>
              </TouchableOpacity>
            ))}
            {filteredItems.length < 1 && (
              <Text style={styles.objectText}>{t('components.object_selection.no_object_found')}</Text>
            )}
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export {ObjectSelectorSection};
