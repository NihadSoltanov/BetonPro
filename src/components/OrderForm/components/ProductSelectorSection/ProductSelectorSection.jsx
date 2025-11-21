import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View, TouchableOpacity} from 'react-native';
import {CustomModal as Modal} from '../../../../components/Modal/Modal';
import {TextInput} from '../../../../components/Inputs';
import styles from './ProductSelectorSection.styles';
import modalStyles from '../../../SupportModal/SupportModal.styles';
import {ProductLabel} from '../ProductLabel/ProductLabel';
import { useTranslate } from '../../../../hooks/useTranslate';
import {CrossSvg} from '../../../../assets/icons';
import {IconButton} from '../../../Buttons';


const ProductSelectorSection = ({items, onSelect, value, disabled}) => {

  const { t} = useTranslate();
  const [filteredItems, setFilteredItems] = useState(items);
  const [isProductSelectorVisible, setIsProductSelectorVisible] =
    useState(false);

  useEffect(() => {
    if (items) setFilteredItems(items);
  }, [items]);

  const onClose = () => {
    setIsProductSelectorVisible(false);
  };

  const handleItemSelect = (item) => {
    onSelect(item);
    onClose();
  };

  const onFilterInputChange = (query) => {
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subText?.toLowerCase()?.includes(query.toLowerCase()),
    );

    setFilteredItems(filtered);
  };

  return (
    <>
      <ProductLabel
        title={value?.name}
        subText={value?.subText}
        placeholder={t('filter_form.choose')}
        onPress={() => setIsProductSelectorVisible(true)}
        disabled={disabled}
      />
      <Modal isVisible={isProductSelectorVisible} onClose={onClose}>
      <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
        <IconButton Icon={CrossSvg} onPress={onClose} />
      </TouchableOpacity>
        <TextInput
          placeholder={t('components.brand_name')}
          onValueChange={(val) => onFilterInputChange(val)}
        />
        <ScrollView>
          <View style={styles.selectionList}>
            {filteredItems?.map((item) => (
              <ProductLabel
                key={item.id}
                title={item.name}
                subText={item.subText}
                onPress={() => handleItemSelect(item)}
                withIcon
              />
            ))}
            {filteredItems?.length < 1 && (
              <Text style={styles.noProductText}>{t('components.no_brands_found')}</Text>
            )}
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export {ProductSelectorSection};
