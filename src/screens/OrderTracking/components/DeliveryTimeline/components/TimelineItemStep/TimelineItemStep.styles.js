import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  SPACING,
} from '../../../../../../styles/theme';

const styles = StyleSheet.create({
  textBase: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
    lineHeight: FONT_SIZE.text.md,
  },
  timeText: {
    opacity: 0.4,
    width: 40,
  },
  timelineItemStep: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: SPACING.lg,
  },
});

export default styles;
