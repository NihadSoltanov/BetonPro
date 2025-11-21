import React, {useMemo, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './TimelineItem.styles';
import {DELIVERY_COLORS_BY_STATUS} from '../../../../../../styles/theme';
import {TimelineItemStep} from '../TimelineItemStep/TimelineItemStep';
import {IconButton, SigningPill} from '../../../../../../components';
import {DotsSvg} from '../../../../../../assets/icons';
import {DELIVERY_STATUS} from '../../../../../../config';
import {formatOrderQuantity} from '../../../../../../util/DisplayFormatterUtils';

function TimelineItem({
  title,
  amount,
  statusText,
  status,
  signed,
  steps,
  handleActionPress,
  noBorder,
  isGpsTracked,
}) {
  const color = useMemo(() => DELIVERY_COLORS_BY_STATUS[status], [status]);
  const [shouldHideSteps, setShouldHideSteps] = useState(true);

  const handleStepsToggle = () => setShouldHideSteps((prev) => !prev);

  return (
    <View
      style={[
        styles.container,
        {borderColor: color},
        noBorder && styles.noBorder,
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.headerPoint,
            {borderColor: color},
            isGpsTracked && {backgroundColor: color},
          ]}
        />
        <TouchableOpacity
          onPress={handleStepsToggle}
          disabled={status !== DELIVERY_STATUS.DELIVERED}
        >
          <Text style={styles.headerText}>
            {title}
            <Text style={styles.headerSubtext}>{` • ${formatOrderQuantity(
              amount,
            )}`}</Text>
          </Text>
        </TouchableOpacity>
        {status === DELIVERY_STATUS.DELIVERED && (
          <View style={{position: 'absolute', right: 0}}>
            <IconButton Icon={DotsSvg} onPress={handleActionPress} />
          </View>
        )}
      </View>
      <Text style={styles.statusText}>
        {status === DELIVERY_STATUS.TRANSIT
          ? 'Kelyje'
          : statusText || (steps?.[steps.length - 1]?.title ?? '')}
      </Text>

      {signed !== undefined && <SigningPill signed={signed} />}
      {steps &&
        steps.length > 0 &&
        !(status === DELIVERY_STATUS.DELIVERED && shouldHideSteps) &&
        steps.map((step, i) => (
          <TimelineItemStep key={i} title={step.title} time={step.time} />
        ))}
    </View>
  );
}

export {TimelineItem};
