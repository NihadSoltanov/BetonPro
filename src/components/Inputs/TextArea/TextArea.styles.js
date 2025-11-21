import {StyleSheet} from 'react-native';
import {FONT_SIZE, COLORS, SPACING, FONTS} from '../../../styles/theme';

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    fontFamily: FONTS.primary,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: SPACING.sm,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.primary,
    borderBottomColor: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  disabled: {
    color: COLORS.darkGrey,
    borderBottomColor: COLORS.darkGrey,
    opacity: 0.5,
  },
});

export default styles;
