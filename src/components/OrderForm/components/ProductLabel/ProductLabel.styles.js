import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1.4,
    gap: SPACING.xxs,
  },
  icon: {
    color: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'flex-end',
  },
  subTextContainer: {
    flexDirection: 'row',
  },
  subText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 14,
  },
  placeholderText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.lightGrey,
    textAlign: 'right',
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
    flex: 1,
    flexWrap: 'wrap',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default styles;
