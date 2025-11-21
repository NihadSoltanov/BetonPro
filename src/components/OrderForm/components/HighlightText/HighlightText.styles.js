import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE} from '../../../../styles/theme';

const styles = StyleSheet.create({
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
  button: {flex: 1, alignItems: 'flex-end', justifyContent: 'center'},
  disabled: {
    opacity: 0.4,
  },
});

export default styles;
