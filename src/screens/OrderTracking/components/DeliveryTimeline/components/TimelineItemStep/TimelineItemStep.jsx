import React from 'react';
import {Text, View} from 'react-native';
import styles from './TimelineItemStep.styles';

const TimelineItemStep = ({title, time}) => (
  <View style={styles.timelineItemStep}>
    {time && <Text style={[styles.textBase, styles.timeText]}>{time}</Text>}
    {title && <Text style={styles.textBase}>{title}</Text>}
  </View>
);

export {TimelineItemStep};
