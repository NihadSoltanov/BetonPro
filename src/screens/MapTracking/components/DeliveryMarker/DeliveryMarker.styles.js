import {StyleSheet} from 'react-native';
import {
  COLORS,
  RADIUS,
  SPACING,
  FONTS,
  FONT_SIZE,
  DELIVERY_COLORS_BY_STATUS,
} from '../../../../styles/theme';

const styles = StyleSheet.create({
  markerIconContainer: {
    padding: SPACING.xxs,
    borderRadius: RADIUS.button,
  },
  markerIcon: {color: COLORS.white, width: 25, height: 25},
  tooltip: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.button,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
    display: 'flex',
    flexDirection: 'row',
  },
  tooltipHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xxs,
  },
  tooltipBoldText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
  },
  tooltipText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
  },
  estimateArrival: {
    backgroundColor: DELIVERY_COLORS_BY_STATUS.TRANSIT,
    borderRadius: RADIUS.button,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    marginRight: SPACING.xs,
  },
  adjustedPadding: {paddingLeft: SPACING.xxs},
  estimateArrivalTextBold: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.white,
    lineHeight: FONT_SIZE.heading.xs,
  },
  estimateArrivalText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.white,
    lineHeight: FONT_SIZE.text.sm,
  },
});

export default styles;
