import React, {useMemo} from 'react';
import {View} from 'react-native';
import styles from './GraphLine.styles';

function GraphLine({totalAmount, amount, color}) {
  const width = useMemo(
    () => (totalAmount < amount ? 100 : (amount / totalAmount) * 100),
    [totalAmount, amount],
  );

  return (
    <View
      style={[
        styles.graphLine,
        {
          backgroundColor: color,
          width: `${width}%`,
        },
      ]}
    />
  );
}

export {GraphLine};
