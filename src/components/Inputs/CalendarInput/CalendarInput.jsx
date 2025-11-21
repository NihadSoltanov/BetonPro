import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from './CalendarInput.styles';
import { COLORS } from '../../../styles/theme';
import { LeftArrowSvg, RightArrowSvg } from '../../../assets/icons';
import { DAY_NAMES, MONTH_NAMES } from './config';

const CalendarInput = ({
  onDateChange,
  minDate,
  maxDate,
  selectedDate,
  locale = 'en',
  width,
  allowRangeSelection,
  selectedEnd,
}) => {
  // Range veya single selection kontrolü
  const markedDates = allowRangeSelection
    ? {
        [selectedDate]: { startingDay: true, color: COLORS.secondary, textColor: COLORS.white },
        [selectedEnd]: { endingDay: true, color: COLORS.secondary, textColor: COLORS.white },
      }
    : {
        [selectedDate]: { selected: true, selectedColor: COLORS.secondary },
      };

  return (
    <View style={[styles.container, { width: width || '100%' }]}>
      <Calendar
        onDayPress={(day) => onDateChange(day.dateString)}
        minDate={minDate}
        maxDate={maxDate}
        markedDates={markedDates}
        markingType={allowRangeSelection ? 'period' : 'simple'}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <LeftArrowSvg style={styles.monthArrow} />
          ) : (
            <RightArrowSvg style={styles.monthArrow} />
          )
        }
        theme={{
          backgroundColor: 'white',
          calendarBackground: 'white',
          textSectionTitleColor: COLORS.primary,
          selectedDayBackgroundColor: COLORS.secondary,
          selectedDayTextColor: COLORS.white,
          todayTextColor: COLORS.primary,
          dayTextColor: COLORS.text,
          monthTextColor: COLORS.primary,
          textMonthFontFamily: 'Poppins-Bold',
          textDayFontFamily: 'Poppins-Regular',
          textDayHeaderFontFamily: 'Poppins-Medium',
        }}
      />
    </View>
  );
};

export { CalendarInput };
