import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, RADIUS, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  pill: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.darkGrey,
    lineHeight: FONT_SIZE.text.sm,
    marginLeft: SPACING.lg,
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.box,
    paddingHorizontal: SPACING.xxs,
  },
  signingPillContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: SPACING.xxs,
  },
  signedPill: {
    opacity: 0.4,
  },
});

export default styles;
