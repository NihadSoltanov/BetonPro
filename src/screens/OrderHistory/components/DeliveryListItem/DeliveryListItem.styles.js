import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
  boldText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
  },
  seperator: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
    paddingHorizontal: SPACING.xxs,
  },
  regularText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  subText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.darkGrey,
  },
  smallSeparator: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.darkGrey,
    paddingHorizontal: SPACING.xxs,
  },
  rootContainer: {
    marginTop: SPACING.sm,
  },
  measureText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.grey,
    marginTop: 2,
  },

});

export default styles;
