import {StyleSheet} from 'react-native';
import {FONT_SIZE, COLORS, SPACING, FONTS, RADIUS} from '../../../styles/theme';

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  input: {
    borderWidth: 1,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.text,
    fontFamily: FONTS.regular,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xxs,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    color: COLORS.primary,
    viewBox: '0 0 32 32',
    width: 16,
    height: 14,
  },
});

export default styles;
