import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
  },
  buttonContainer: {
    paddingTop: SPACING.sm,
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.lg,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    paddingTop: SPACING.sm,
  },
  address: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default styles;
