import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styles from './DateInput.styles';
import {BottomDrawerWithOverlay} from '../../../../components/BottomDrawerWithOverlay/BottomDrawerWithOverlay';
import {CalendarInput} from '../../../../components/Inputs';
import {Button} from '../../../../components/Buttons';
import {DateInputButton} from './components';
import {HighlightText} from '../HighlightText/HighlightText';
import {formatDisplayDate} from '../../../../util/DisplayFormatterUtils';
import {SPACING} from '../../../../styles/theme';

const DateInput = ({value, onSubmit}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const onClose = () => {
    setIsInputVisible(false);
    setSelectedDate(value);
  };

  const submitCallback = () => {
    onSubmit(selectedDate);
    onClose();
  };

  const getFormatedDisplayValue = (date) => {
    if (!date) return 'Pasirinkite...';
    return formatDisplayDate(date);
  };

  // const onTodayPress = () => {
  //   setSelectedDate(new Date());
  // };

  const onTomorrowPress = () => {
    const today = new Date();
    today.setUTCDate(today.getUTCDate() + 1);
    setSelectedDate(today);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  return (
    <>
      <HighlightText
        text={value ? getFormatedDisplayValue(value) : null}
        placeholder="Pasirinkite..."
        onPress={() => setIsInputVisible(true)}
      />
      <BottomDrawerWithOverlay isVisible={isInputVisible} onClose={onClose}>
        <View style={styles.container}>
          <View style={styles.dateButtonContainer}>
            {/* <DateInputButton
              label="Šiandien"
              variant="solid"
              onPress={onTodayPress}
              selectedDate={selectedDate}
            /> */}
            <DateInputButton
              label="Rytoj"
              variant="outlined"
              onPress={onTomorrowPress}
            />
          </View>
          <View>
            <CalendarInput
              selectedDate={selectedDate}
              onDateChange={(val) => setSelectedDate(new Date(val))}
              minDate={getMinDate()}
              locale="lt"
              width={Dimensions.get('screen').width - SPACING.md * 2}
            />
          </View>
          <Text style={styles.valueDisplay}>
            {getFormatedDisplayValue(selectedDate)}
          </Text>
          <View style={styles.submitButtonContainer}>
            <View flex={1}>
              <Button variant="outlined" label="Atšaukti" onPress={onClose} />
            </View>
            <View flex={1}>
              <Button
                variant="solid"
                label="Patvirtinti"
                onPress={submitCallback}
              />
            </View>
          </View>
        </View>
      </BottomDrawerWithOverlay>
    </>
  );
};

export {DateInput};
