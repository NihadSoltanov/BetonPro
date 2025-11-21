import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xxs,
    flex: 1,
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  icon: {
    color: COLORS.primary,
    width: 25,
    height: 25,
  },
  error: {
    borderWidth: 1,
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorBackground,
    paddingBottom: 0,
  },
  errorText: {
    color: COLORS.error,
    fontFamily: FONTS.bold,
  },
  errorMessage: {
    color: COLORS.error,
    paddingVertical: SPACING.xxs,
    fontSize: FONT_SIZE.text.xxs,
    fontFamily: FONTS.regular,
    textAlign: 'right',
  },
  success: {
    borderWidth: 1,
    borderColor: COLORS.success,
    backgroundColor: COLORS.errorBackground,
    paddingBottom: 0,
  },
  successText: {
    color: COLORS.success,
    fontFamily: FONTS.bold,
  },
  successMessage: {
    color: COLORS.success,
    paddingVertical: SPACING.xxs,
    fontSize: FONT_SIZE.text.xxs,
    fontFamily: FONTS.regular,
    textAlign: 'right',
  },
});

export default styles;
