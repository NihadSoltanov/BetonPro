import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  measurementUnitText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  disabled: {
    opacity: 0.4,
  },
});

export default styles;
