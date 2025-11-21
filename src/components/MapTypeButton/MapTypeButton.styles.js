import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, RADIUS, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  button: {display: 'flex', alignItems: 'center', gap: SPACING.xxs},
  buttonText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
    textTransform: 'capitalize',
  },
  buttonImage: {
    width: 108,
    height: 85,
    borderRadius: RADIUS.box,
    borderColor: COLORS.darkGrey,
    borderWidth: 1,
  },
  activeText: {color: COLORS.primary},
  activeImage: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});

export default styles;
