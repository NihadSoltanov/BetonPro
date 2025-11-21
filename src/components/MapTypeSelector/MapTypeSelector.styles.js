import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, RADIUS, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
  },
  buttonContainer: {
    paddingTop: SPACING.sm,
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.lg,
    justifyContent: 'center',
  },
  button: {display: 'flex', alignItems: 'center', gap: SPACING.xxs},
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: SPACING.sm,
  },
  buttonText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
  },
  buttonImage: {
    width: 108,
    height: 85,
    borderRadius: RADIUS.box,
    borderColor: COLORS.darkGrey,
    borderWidth: 1,
  },
  active: {borderColor: COLORS.primary, color: COLORS.primary},
});

export default styles;
