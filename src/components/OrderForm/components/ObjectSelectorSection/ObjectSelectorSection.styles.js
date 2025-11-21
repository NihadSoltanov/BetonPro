import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  objectText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    paddingVertical: SPACING.xs,
    color: COLORS.darkGrey,
  },
  highligtedText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
    flexWrap: 'wrap',
  },
  placeholderText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.lightGrey,
  },
});

export default styles;
