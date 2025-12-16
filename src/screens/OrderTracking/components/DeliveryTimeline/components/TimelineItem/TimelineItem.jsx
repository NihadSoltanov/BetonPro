import React, { useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './TimelineItem.styles';
import { DELIVERY_COLORS_BY_STATUS } from '../../../../../../styles/theme';
import { TimelineItemStep } from '../TimelineItemStep/TimelineItemStep';
import { IconButton, SigningPill } from '../../../../../../components';
import { DotsSvg } from '../../../../../../assets/icons';
import { DELIVERY_STATUS } from '../../../../../../config';
import { formatOrderQuantity } from '../../../../../../util/DisplayFormatterUtils';
import {useTranslation} from 'react-i18next';
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
   const { t } = useTranslation();
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
   const showPlant = hasValidMeasurements(plant);
    const showOnSite = hasValidMeasurements(onSite);
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

    {(showPlant || showOnSite) && (
      <View style={styles.measurementsContainer}>
        <View style={styles.measurementsRow}>

          {showPlant && (
            <View style={styles.measurementsBlock}>
              <Text style={styles.measurementsTitle}>{t('order_history_form.delivery_item.at_plant')}</Text>
              <Text style={styles.measurementsText}>
                {t('order_history_form.delivery_item.temperature')}: {plant?.temperature}
              </Text>
              <Text style={styles.measurementsText}>
                {t('order_history_form.delivery_item.slump')}: {plant?.slump}
              </Text>
            </View>
          )}

          {showOnSite && (
            <View style={styles.measurementsBlock}>
              <Text style={styles.measurementsTitle}> {t('order_history_form.delivery_item.on_site')}</Text>
              <Text style={styles.measurementsText}>
                 {t('order_history_form.delivery_item.temperature')}: {onSite?.temperature}
              </Text>
              <Text style={styles.measurementsText}>
               {t('order_history_form.delivery_item.slump')}: {onSite?.slump}
              </Text>
            </View>
          )}

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
    <View style={styles.deliveryDivider} />
    </View>
  );
}

export { TimelineItem };
