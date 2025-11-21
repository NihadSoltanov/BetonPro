import {StyleSheet} from 'react-native';
import {FONT_SIZE, COLORS, FONTS, SPACING} from '../../../styles/theme';

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.text.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    fontFamily: FONTS.regular,
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  icon: {
    color: COLORS.primary,
    width: 19,
    height: 19,
  },
  primary: {
    color: COLORS.primary,
  },
  secondary: {
    color: COLORS.white,
  },
});

export default styles;
