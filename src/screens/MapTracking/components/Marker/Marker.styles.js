import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '../../../../styles/theme';

const styles = StyleSheet.create({
  markerIconContainer: {
    padding: SPACING.xxs,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    borderRadius: RADIUS.button,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  markerIcon: {color: COLORS.white},
  text: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.text.xs,
    padding: SPACING.xxs,
    color: COLORS.darkGrey,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default styles;
