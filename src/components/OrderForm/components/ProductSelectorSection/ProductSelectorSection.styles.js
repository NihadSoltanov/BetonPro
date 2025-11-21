import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  highligtedText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
    flexWrap: 'wrap',
  },
  noProductText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    paddingVertical: SPACING.xs,
    color: COLORS.darkGrey,
  },
  selectionList: {
    gap: SPACING.xs,
  },
});

export default styles;
