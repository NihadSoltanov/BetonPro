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
    marginLeft: SPACING.lg,
  },
  headerSubtext: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  headerPoint: {
    top: 0,
    borderRadius: RADIUS.button,
    borderWidth: 1.5,
    width: 25,
    height: 25,
    position: 'absolute',
    left: -13,
    zIndex: 99,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: SPACING.sm,
    borderLeftWidth: 2,
    marginLeft: SPACING.xs,
  },
});

export default styles;
