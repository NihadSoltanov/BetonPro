import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  containerBase: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryContainer: {
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
    marginTop: SPACING.md,
    paddingVertical: SPACING.md,
  },
  priceContainer: {
    paddingTop: SPACING.md,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  boldText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
  },
  priceText: {
    fontSize: FONT_SIZE.heading.xs,
  },
  submitContainer: {
    position: 'absolute',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    bottom: SPACING.lg,
    marginHorizontal: SPACING.md,
  },
  loaderContainer: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
  },
});

export default styles;
