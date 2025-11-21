import React from 'react';
import {View} from 'react-native';
import {DELIVERY_COLORS_BY_STATUS} from '../../../../styles/theme';
import styles from './ProgressGraph.styles';
import {GraphLine} from '../GraphLine/GraphLine';

function ProgressGraph({
  totalAmount,
  deliveredAmount,
  onSiteAmount,
  transitAmount,
  productionAmount,
}) {
  return (
    <View style={styles.container}>
      <GraphLine
        totalAmount={totalAmount}
        amount={totalAmount}
        color={DELIVERY_COLORS_BY_STATUS.NO_STATUS}
      />
      <GraphLine
        totalAmount={totalAmount}
        amount={
          deliveredAmount + onSiteAmount + transitAmount + productionAmount
        }
        color={DELIVERY_COLORS_BY_STATUS.PRODUCTION}
      />
      <GraphLine
        totalAmount={totalAmount}
        amount={deliveredAmount + onSiteAmount + transitAmount}
        color={DELIVERY_COLORS_BY_STATUS.TRANSIT}
      />
      <GraphLine
        totalAmount={totalAmount}
        amount={deliveredAmount + onSiteAmount}
        color={DELIVERY_COLORS_BY_STATUS.ONSITE}
      />
      <GraphLine
        totalAmount={totalAmount}
        amount={deliveredAmount}
        color={DELIVERY_COLORS_BY_STATUS.DELIVERED}
      />
    </View>
  );
}

export {ProgressGraph};
