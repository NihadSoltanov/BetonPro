import {StyleSheet} from 'react-native';
import {FONT_SIZE, COLORS, FONTS, SPACING} from '../../../styles/theme';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  icon: {
    width: 30,
    height: 30,
    color: COLORS.white,
    backgroundColor: COLORS.white, //placeholder till icon is given
  },
  iconBig: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: FONT_SIZE.text.md,
    color: COLORS.white,
    borderBottomColor: COLORS.accent,
    fontFamily: FONTS.regular,
  },
});

export default styles;
