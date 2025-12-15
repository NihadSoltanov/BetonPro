import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING } from '../../styles/theme';

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    minHeight: 150,
  },

  titleText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },


  submitContainer: {
    width: '100%',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    flexDirection: 'column',
    gap: 12,
  },

  subText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
});

export default styles;
