import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  inputValue: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    paddingVertical: SPACING.xs,
    color: COLORS.darkGrey,
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
    marginTop:10,
    marginLeft:10
  },
  btn:{
    marginBottom:15,
    marginLeft:15
  }
});

export default styles;
