import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import styles from './TimelineHeader.styles';
import {DELIVERY_COLORS_BY_STATUS} from '../../../../../../styles/theme';
import {
  CarSvg,
  ClockSvg,
  MarkerSvg,
  TickSvg,
} from '../../../../../../assets/icons';
import {DELIVERY_STATUS} from '../../../../../../config';
import {formatOrderQuantity} from '../../../../../../util/DisplayFormatterUtils';

function TimelineHeader({title, amount, status}) {
  const color = useMemo(() => DELIVERY_COLORS_BY_STATUS[status], [status]);

  const Icon = useMemo(() => {
    switch (status) {
      case DELIVERY_STATUS.PRODUCTION:
        return (
          <ClockSvg color={color} width={15} height={15} viewBox="0 0 35 36" />
        );
      case DELIVERY_STATUS.TRANSIT:
        return (
          <CarSvg color={color} width={18} height={15} viewBox="0 0 50 36" />
        );
      case DELIVERY_STATUS.ONSITE:
        return <MarkerSvg color={color} />;
      case DELIVERY_STATUS.DELIVERED:
        return <TickSvg color={color} />;
      default:
        return <></>;
    }
  }, [status, color]);

  return (
    <View style={[styles.header, {borderColor: color}]}>
      <View style={[styles.headerPoint, {borderColor: color}]}>{Icon}</View>
      <Text style={styles.headerText}>
        {title}
        <Text style={styles.headerSubtext}>{` (${formatOrderQuantity(
          amount,
        )})`}</Text>
      </Text>
    </View>
  );
}

export {TimelineHeader};
