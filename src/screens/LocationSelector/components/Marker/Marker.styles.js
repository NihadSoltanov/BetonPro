import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '../../../../styles/theme';

const styles = StyleSheet.create({
  markerIconContainerBase: {
    padding: SPACING.xs,
    borderRadius: RADIUS.button,
  },
  markerIconContainer: {
    backgroundColor: COLORS.lightGrey,
  },
  markerIconContainerActive: {
    backgroundColor: `${COLORS.lightGrey}66`,
  },
  markerContainerBase: {
    borderRadius: RADIUS.button,
    display: 'flex',
    flexDirection: 'row',
  },
  markerContainer: {
    backgroundColor: COLORS.white,
  },
  markerContainerActive: {
    backgroundColor: COLORS.darkGrey,
  },
  markerIcon: {color: COLORS.darkGrey},
  markerIconActive: {color: COLORS.white},
  textBase: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.text.xs,
    padding: SPACING.xxs,
  },
  text: {
    color: COLORS.darkGrey,
  },
  textActive: {
    color: COLORS.white,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default styles;
