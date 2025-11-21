import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  SPACING,
} from '../../../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: SPACING.md,
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  signedHeader: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
    textAlign: 'center',
    paddingTop: SPACING.md,
  },
});

export default styles;
