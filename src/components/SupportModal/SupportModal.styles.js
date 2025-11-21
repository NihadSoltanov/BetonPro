import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, RADIUS, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.sm,
    marginBottom: SPACING.md,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  closeButton: {
    borderRadius: RADIUS.button,
    position: 'absolute',
    right: 0,
    top: 8,
  },
});

export default styles;
