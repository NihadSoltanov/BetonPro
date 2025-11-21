import {StyleSheet} from 'react-native';
import {COLORS, SPACING, RADIUS, FONTS, FONT_SIZE} from '../../../styles/theme';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.button,
    padding: SPACING.xs,
  },
  icon: {
    width: 18,
    height: 18,
    color: COLORS.black,
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xs,
    color: COLORS.darkGrey,
  },
});

export default styles;
