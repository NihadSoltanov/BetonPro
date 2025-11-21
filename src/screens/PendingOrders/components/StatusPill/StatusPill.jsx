import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import {PENDING_ORDER_STATUS} from '../../../../api/orderStatus';
import styles from './StatusPill.styles';

const StatusPill = ({text, status}) => {
  const style = useMemo(() => {
    if (status === PENDING_ORDER_STATUS.APPROVED) return styles.accepted;
    if (status === PENDING_ORDER_STATUS.PENDING) return styles.pending;

    return {};
  }, [status]);

  if (status === null || status === undefined) return <></>;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, style]}>•</Text>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
};

export {StatusPill};
