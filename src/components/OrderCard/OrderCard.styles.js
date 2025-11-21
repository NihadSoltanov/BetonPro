import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  orderIdText: {
    color: COLORS.darkGrey,
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xs,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderSubText: {
    color: COLORS.darkGrey,
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
  },
  orderPriceText: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
  },
  orderSubHeaderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: SPACING.xxs,
    flex: 1,
  },
  orderSubHeaderDetailsOpen: {
    paddingBottom: SPACING.md,
  },
  orderSubHeaderDetailsText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
  },
});

export default styles;
