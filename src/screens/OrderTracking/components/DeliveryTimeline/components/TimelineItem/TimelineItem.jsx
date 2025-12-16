import React, { useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './TimelineItem.styles';
import { DELIVERY_COLORS_BY_STATUS } from '../../../../../../styles/theme';
import { TimelineItemStep } from '../TimelineItemStep/TimelineItemStep';
import { IconButton, SigningPill } from '../../../../../../components';
import { DotsSvg } from '../../../../../../assets/icons';
import { DELIVERY_STATUS } from '../../../../../../config';
import { formatOrderQuantity } from '../../../../../../util/DisplayFormatterUtils';

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
  plant,
  onSite,
}) {
  const color = useMemo(
    () => DELIVERY_COLORS_BY_STATUS[status],
    [status]
  );

  const [shouldHideSteps, setShouldHideSteps] = useState(true);

  const hasValidMeasurements = (data) => {
    if (!data) return false;

    const temp = parseFloat(data.temperature);
    const slump = parseFloat(data.slump);

    return (
      (Number.isFinite(temp) && temp !== 0) ||
      (Number.isFinite(slump) && slump !== 0)
    );
  };

  const showMeasurements =
    hasValidMeasurements(plant) || hasValidMeasurements(onSite);

  const handleStepsToggle = () =>
    setShouldHideSteps((prev) => !prev);

  return (
    <View
      style={[
        styles.container,
        { borderColor: color },
        noBorder && styles.noBorder,
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={[
            styles.headerPoint,
            { borderColor: color },
            isGpsTracked && { backgroundColor: color },
          ]}
        />

        <TouchableOpacity
          onPress={handleStepsToggle}
          disabled={status !== DELIVERY_STATUS.DELIVERED}
        >
          <Text style={styles.headerText}>
            {title}
            <Text style={styles.headerSubtext}>
              {` • ${formatOrderQuantity(amount)}`}
            </Text>
          </Text>
        </TouchableOpacity>

        {status === DELIVERY_STATUS.DELIVERED && (
          <View style={{ position: 'absolute', right: 0 }}>
            <IconButton
              Icon={DotsSvg}
              onPress={handleActionPress}
            />
          </View>
        )}
      </View>

      {/* STATUS TEXT */}
      <Text style={styles.statusText}>
        {status === DELIVERY_STATUS.TRANSIT
          ? 'Kelyje'
          : statusText ||
            (steps?.[steps.length - 1]?.title ?? '')}
      </Text>

      {/* SIGN */}
      {signed !== undefined && (
        <SigningPill signed={signed} />
      )}

      {/* MEASUREMENTS */}
      {showMeasurements && (
        <View style={styles.measurementsContainer}>
          <View style={styles.measurementsRow}>
            <View style={styles.measurementsBlock}>
              <Text style={styles.measurementsTitle}>At plant</Text>
              <Text style={styles.measurementsText}>
                Temp: {plant?.temperature ?? '—'}
              </Text>
              <Text style={styles.measurementsText}>
                Slump: {plant?.slump ?? '—'}
              </Text>
            </View>

            <View style={styles.measurementsBlock}>
              <Text style={styles.measurementsTitle}>On site</Text>
              <Text style={styles.measurementsText}>
                Temp: {onSite?.temperature ?? '—'}
              </Text>
              <Text style={styles.measurementsText}>
                Slump: {onSite?.slump ?? '—'}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* TIMELINE STEPS */}
      {steps &&
        steps.length > 0 &&
        !(
          status === DELIVERY_STATUS.DELIVERED &&
          shouldHideSteps
        ) &&
        steps.map((step, i) => (
          <TimelineItemStep
            key={i}
            title={step.title}
            time={step.time}
          />
        ))}
    </View>
  );
}

export { TimelineItem };
