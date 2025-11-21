import {StyleSheet} from 'react-native';
import {COLORS, SPACING, RADIUS} from '../../styles/theme';

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.box,
    width: '100%',
  },
  withoutPadding: {padding: 0},
});

export default styles;
