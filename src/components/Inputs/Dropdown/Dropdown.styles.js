import {StyleSheet} from 'react-native';
import {FONT_SIZE, COLORS, FONTS, RADIUS} from '../../../styles/theme';

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  input: {
    borderWidth: 1,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.text,
    fontFamily: FONTS.regular,
  },
});

export default styles;
