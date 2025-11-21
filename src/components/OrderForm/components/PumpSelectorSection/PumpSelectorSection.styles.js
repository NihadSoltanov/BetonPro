import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  inputValue: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    paddingVertical: SPACING.xs,
    color: COLORS.darkGrey,
  },
});

export default styles;
