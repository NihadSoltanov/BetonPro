import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import styles from './FilterScreen.styles';
import {
  ProfileButton,
  Button,
  BorderedDateInput,
  CalendarInput,
  LinkButton,
  Dropdown,
  FiltersHeader,
} from '../../components';
import {ROUTES} from '../../routing/routes';
import {
  FilterContext,
  DURATION_SELECTION,
  DURATION_SELECTION_VALUES,
} from '../../context/FilterProvider';
import {SPACING} from '../../styles/theme';
import {useObjects, useCoworkers} from '../../hooks/data';
import {formatDisplayDate} from '../../util/DisplayFormatterUtils';
import { useTranslate } from '../../hooks/useTranslate';

const FilterScreen = ({navigation, route}) => {
  const { t} = useTranslate();
  const {previewFilters, actions} = useContext(FilterContext);
  const [isCalendarActive, setIsCalendarActive] = useState(false);
  const [coworker,setCoworker]=useState('');
  const {objects} = useObjects(coworker);
  const {coworkers} = useCoworkers();

const objectOptions = useMemo(() => {
  const result = [{ label: t('filter_form.not_selected'), value: '' }];

  if (!Array.isArray(objects)) {
    return result;
  }

  objects.forEach((object) => {
    result.push({
      label: object.addressName,
      value: object.addressName,
      key: String(object.id),
    });
  });

  return result;
}, [objects]);



  const coworkerOptions = useMemo(() => {
    const result = [{label: t('filter_form.not_selected'), value: ''}];
    if (!coworkers) return result;

    coworkers.forEach((coworker) => {
      result.push({
        label: coworker.name,
        value: coworker.id,
        key: String(coworker.id)
      });
    });
    return result;
  }, [coworkers]);
    useEffect(() => {
    }, [coworker]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      actions.syncFilters();
    });

    return unsubscribe;
  }, [navigation]);

const onHandleCoworker = (val) => {
  const name = coworkerOptions.find(c => c.value === val)?.label || '';

  actions.onOrderByChange(val, name);
  setCoworker(name);
};


  return (
    <FiltersHeader
      title={t('filter_form.filter')}
      menuItem={
        <ProfileButton onPress={() => navigation.navigate(ROUTES.PROFILE)} />
      }
      onBackPress={() => navigation.goBack()}
      footer={
        <View style={styles.submitContainer}>
          <Button
            label={t('filter_form.reset')}
            variant="outlined"
            onPress={() => {
              actions.resetPreviewFilters();
              setIsCalendarActive(false);
            }}
            buttonStyle={styles.resetFiltersButton}
          />
          <Button
            label={t('filter_form.customize_options')}
            variant="solid"
            onPress={() => {
              actions.submitFilters();
              navigation.goBack();
            }}
          />
        </View>
      }
    >
      <View style={styles.pageContainer}>
        {!route?.params?.disableDate && (
          <View>
            <Text style={styles.durationText}>{t('filter_form.period')}</Text>
            <ScrollView style={styles.durationButtons} horizontal>
              {DURATION_SELECTION.map((selection) => (
                <View key={selection.value} style={styles.pillButtonContainer}>
                  <Button
                    label={selection.title}
                    variant={
                      previewFilters.duration === selection.value
                        ? 'solid'
                        : 'outlined'
                    }
                    buttonStyle={styles.pillButton}
                    textStyle={styles.pillButtonText}
                    onPress={() => actions.onDurationChange(selection.value)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {previewFilters.duration === DURATION_SELECTION_VALUES.PICK_VALUE && (
          <View style={styles.dateContainer}>
            <View style={styles.dateInputContainer}>
              <View flex={1}>
                <BorderedDateInput
                  label={t('filter_form.since_when')}
                  value={
                    previewFilters.startDate
                      ? formatDisplayDate(previewFilters.startDate)
                      : t('filter_form.choose')
                  }
                  onPress={() => setIsCalendarActive((prev) => !prev)}
                />
              </View>
              <View flex={1}>
                <BorderedDateInput
                  label={t('filter_form.till_when')}
                  value={
                    previewFilters.endDate
                      ? formatDisplayDate(previewFilters.endDate)
                      : t('filter_form.choose')
                  }
                  onPress={() => setIsCalendarActive((prev) => !prev)}
                />
              </View>
            </View>
            {isCalendarActive && (
              <View style={styles.calendarContainer}>
                <CalendarInput
                  locale={'lt'}
                  width={Dimensions.get('screen').width - SPACING.md * 2}
                  allowRangeSelection={true}
                  onDateChange={(date, type) => {
                    if (type === 'START_DATE' && date)
                      actions.onStartDateChange(date);
                    if (type === 'END_DATE' && date)
                      actions.onEndDateChange(date);
                  }}
                  selectedDate={previewFilters?.startDate}
                  selectedEnd={previewFilters?.endDate}
                />
              </View>
            )}
            {isCalendarActive && (
              <View style={styles.calendarLinkButtonContainer}>
                <LinkButton
                  title={t('filter_form.hide_calendar')}
                  variant="primary"
                  onPress={() => setIsCalendarActive(false)}
                />
              </View>
            )}
          </View>
        )}
        <Dropdown
          title={t('filter_form.orders_placed_by')}
          value={previewFilters.customerId}
          items={coworkerOptions}
          onChange={(val) =>
            onHandleCoworker(val)
          }
          style={styles.dropdownInput}
        />
        <Dropdown
          title={t('filter_form.object')}
          value={previewFilters.objectId}
          items={objectOptions}
          onChange={(val) =>
            actions.onObjectChange(
              val,
              objectOptions.find((object) => object.value === val)?.label,
            )
          }
          style={styles.dropdownInput}
        />
      </View>
    </FiltersHeader>
  );
};

export {FilterScreen};
