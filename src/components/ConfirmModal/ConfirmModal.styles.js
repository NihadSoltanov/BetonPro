import {StyleSheet} from 'react-native';
import {COLORS, SPACING, FONTS, FONT_SIZE} from '../../styles/theme';

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.sm,
    color: COLORS.darkGrey,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: SPACING.md,
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.xxs,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
    textAlign: 'center',
  },
});

export default styles;
