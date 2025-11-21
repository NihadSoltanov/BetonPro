import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text, View} from 'react-native';
import styles from './Dropdown.styles';
import { useTranslate } from '../../../hooks/useTranslate';

const Dropdown = ({value, onChange, items, title, style}) => {
  const { t} = useTranslate();
  const [selections, setSelections] = useState(items);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelections(items);
  }, [items]);

  return (
    <View style={[style && style, {zIndex: open ? 500 : 1}]}>
      <Text style={styles.title}>{title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        itemKey="key"
        items={selections}
        setOpen={setOpen}
        setValue={(callback) => onChange(callback())}
        setItems={setSelections}
        placeholder={t('filter_form.choose')}
        listMode="SCROLLVIEW"
        flatListProps={{
          nestedScrollEnabled: true,
        }}
        dropDownContainerStyle={{
          position: 'relative', // to fix scroll issue ... it is by default 'absolute'
          top: 5, //to fix gap between label box and container
        }}
      />
    </View>
  );
};

export {Dropdown};
