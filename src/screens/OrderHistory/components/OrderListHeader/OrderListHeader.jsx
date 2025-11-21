import React from 'react';
import {View, Text} from 'react-native';
import styles from './OrderListHeader.styles';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../../../routing/routes';
import {FilterButton, Pill} from '../../../../components';
import {COLORS, SPACING} from '../../../../styles/theme';
import {useGraphsData} from '../../../../hooks/data/useGraphsData';
import { useTranslate } from '../../../../hooks/useTranslate';

const OrderListHeader = ({filters}) => {
  const {navigate} = useNavigation();
  const {graphData} = useGraphsData();
  const { t} = useTranslate();

  return (
    <View style={{marginHorizontal: SPACING.md}}>
      <View style={styles.headerRow}>
        <Text style={graphData?styles.title:styles.title2}>{t('order_history_form.order_list_header.order_history')}</Text>
        <View>
          <FilterButton
            onPress={() => navigate(ROUTES.FILTER)}
            color={COLORS.primary}
          />
        </View>
      </View>
      <View style={styles.headerRow}>
        <View style={styles.filterPills}>
          {Object.values(filters.filterLabels)
            .filter((val) => val)
            .map((filter) => (
              <Pill text={filter} key={filter} color={COLORS.primary} />
            ))}
        </View>
      </View>
    </View>
  );
};

export {OrderListHeader};
