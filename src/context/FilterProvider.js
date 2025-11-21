import React, {createContext, useState, useMemo} from 'react';
import {formatDisplayDate} from '../util/DisplayFormatterUtils';


export const DURATION_SELECTION_VALUES = {
  ALL: 0,
  THIS_MONTH: 1,
  LAST_MONTH: 2,
  PICK_VALUE: 3,
};

export const DURATION_SELECTION = [
  {title: 'Visi', value: DURATION_SELECTION_VALUES.ALL},
  {title: 'Šį mėnesį', value: DURATION_SELECTION_VALUES.THIS_MONTH},
  {title: 'Praėjusį mėnesį', value: DURATION_SELECTION_VALUES.LAST_MONTH},
  {title: 'Pasirinkti datą', value: DURATION_SELECTION_VALUES.PICK_VALUE},
];

export const FilterContext = createContext();

export const FilterProvider = ({children}) => {
  const initialValues = {
    duration: DURATION_SELECTION_VALUES.ALL,
    startDate: undefined,
    endDate: undefined,
    customerId: undefined,
    objectId: undefined,
    filterLabels: {
      customer: undefined,
      object: undefined,
      duration: undefined,
      date: undefined,
    },
  };

  const [filters, setFilters] = useState(initialValues);
  const [previewFilters, setPreviewFilters] = useState(filters);

  const getDatesFromDuration = (duration) => {
    const today = new Date();
    if (duration === DURATION_SELECTION_VALUES.THIS_MONTH) {
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return {startDate, endDate};
    }

    if (duration === DURATION_SELECTION_VALUES.LAST_MONTH) {
      const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      return {startDate, endDate};
    }

    if (duration === DURATION_SELECTION_VALUES.ALL)
      return {startDate: undefined, endDate: undefined};

    if (duration === DURATION_SELECTION_VALUES.PICK_VALUE)
      return {startDate: filters.startDate, endDate: filters.endDate};
  };

  const actions = {
    onDurationChange: (val) => {
      const {startDate, endDate} = getDatesFromDuration(val);
      setPreviewFilters((prev) => ({
        ...prev,
        duration: val,
        startDate: startDate,
        endDate: endDate,
        filterLabels: {
          ...prev.filterLabels,
          duration:
            val === DURATION_SELECTION_VALUES.ALL ||
            val === DURATION_SELECTION_VALUES.PICK_VALUE
              ? undefined
              : DURATION_SELECTION.find((duration) => duration.value === val)
                  .title,
          date:
            val === DURATION_SELECTION_VALUES.PICK_VALUE
              ? `${formatDisplayDate(startDate)} • ${formatDisplayDate(
                  endDate,
                )}`
              : undefined,
        },
      }));
    },
    onStartDateChange: (val) =>
      setPreviewFilters((prev) => ({
        ...prev,
        startDate: new Date(val),
        endDate: undefined,
      })),
    onEndDateChange: (val) =>
      setPreviewFilters((prev) => ({
        ...prev,
        endDate: new Date(val),
        filterLabels: {
          ...prev.filterLabels,
          date: `${formatDisplayDate(prev.startDate)} • ${formatDisplayDate(
            new Date(val),
          )}`,
        },
      })),
    onOrderByChange: (val, label) =>
      setPreviewFilters((prev) => ({
        ...prev,
        customerId: val,
        filterLabels: {...prev.filterLabels, customer: label},
      })),
    onObjectChange: (val, label) =>
      setPreviewFilters((prev) => ({
        ...prev,
        objectId: val,
        filterLabels: {
          ...prev.filterLabels,
          object: label ? `${label.slice(0, 15)}...` : undefined,
        },
      })),
    resetPreviewFilters: () => setPreviewFilters(initialValues),
    submitFilters: () => setFilters(previewFilters),
    resetFiltering: () => {
      setPreviewFilters(initialValues);
      setFilters(initialValues);
    },
    syncFilters: () => setPreviewFilters(filters),
  };

  const isFiltered = useMemo(() => {
    // eslint-disable-next-line no-unused-vars
    const {duration: _, filterLabels: __, ...rest} = filters;
    return Object.values(rest).some((val) => val !== undefined);
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{actions, filters, previewFilters, isFiltered}}
    >
      {children}
    </FilterContext.Provider>
  );
};
