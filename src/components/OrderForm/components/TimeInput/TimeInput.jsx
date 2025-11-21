import React, {useState} from 'react';
import {HighlightText} from '../HighlightText/HighlightText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatDisplayTime} from '../../../../util/DisplayFormatterUtils';
import { useTranslate } from '../../../../hooks/useTranslate';

const TimeInput = ({hours, minutes, onSubmit}) => {
  const { t} = useTranslate();
  const [isInputVisible, setIsInputVisible] = useState(false);

  const onClose = () => {
    setIsInputVisible(false);
  };

  const onConfirmCallback = (val) => {
    const selectedDate = new Date(val);
    onClose();
    onSubmit(selectedDate.getHours(), selectedDate.getMinutes());
  };

  const getSelectedDate = () => {
    const today = new Date();
    today.setHours(hours ?? 9);
    today.setMinutes(minutes ?? 0);

    return today;
  };

  return (
    <>
      <HighlightText
        text={
          hours !== null && minutes !== null
            ? formatDisplayTime(hours, minutes)
            : null
        }
        placeholder={t('filter_form.choose')}
        onPress={() => setIsInputVisible(true)}
      />
      <DateTimePickerModal
        isVisible={isInputVisible}
        mode="time"
        onConfirm={onConfirmCallback}
        onCancel={onClose}
        is24Hour={true}
        date={getSelectedDate()}
        display="spinner"
        minuteInterval={15}
        positiveButton={t('locationselector.confirmAddressDrawer.confirm')}
        negativeButton={t('locationselector.confirmAddressDrawer.cancel')}
      />
    </>
  );
};

export {TimeInput};
