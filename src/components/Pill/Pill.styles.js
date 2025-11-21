import {StyleSheet} from 'react-native';
import {COLORS, SPACING, RADIUS, FONTS, FONT_SIZE} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
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
  text: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.white,
  },
});

export default styles;
