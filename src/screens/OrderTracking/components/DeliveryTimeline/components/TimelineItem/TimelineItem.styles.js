import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '../../../../../../styles/theme';

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
    lineHeight: FONT_SIZE.heading.xs,
    marginLeft: SPACING.lg,
  },
  headerSubtext: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  headerPoint: {
    borderRadius: RADIUS.button,
    borderWidth: 1.5,
    width: 10,
    height: 10,
    position: 'absolute',
    left: -6,
    top: 0,
    zIndex: 99,
    backgroundColor: COLORS.white,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'center',
  },
  statusText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
    lineHeight: FONT_SIZE.text.sm,
    marginLeft: SPACING.lg,
  },
  container: {
    borderLeftWidth: 2,
    marginLeft: SPACING.xs,
    paddingBottom: SPACING.md,
  },
  noBorder: {
    borderColor: COLORS.white,
  },
});

export default styles;
