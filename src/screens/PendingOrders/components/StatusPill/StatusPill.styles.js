import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '../../../../styles/theme';

const styles = StyleSheet.create({
  pending: {color: COLORS.warning, borderColor: COLORS.warning},
  accepted: {color: COLORS.accent, borderColor: COLORS.accent},
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.xxs,
    borderWidth: 1,
    borderRadius: RADIUS.box,
    paddingHorizontal: SPACING.xxs,
    paddingVertical: 1,
    marginBottom: SPACING.xxs,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
  },
});

export default styles;
