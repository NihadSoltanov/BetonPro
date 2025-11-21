import {StyleSheet} from 'react-native';
import {COLORS, SPACING, RADIUS, FONTS, FONT_SIZE} from '../../../styles/theme';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: `${COLORS.white}4D`,
    borderRadius: RADIUS.button,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xxs,
    gap: SPACING.xxs,
  },
  icon: {
    width: 13,
    height: 13,
    viewBox: '0 0 32 32',
    color: COLORS.white,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.white,
  },
});

export default styles;
