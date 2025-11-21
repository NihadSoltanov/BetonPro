import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE} from '../../../../styles/theme';

const styles = StyleSheet.create({
  loadingContainer: {
    minHeight: 150,
    justifyContent: 'center',
  },
  header: {
    color: COLORS.darkGrey,
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
  },
  orderSubHeaderDetailsText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
  },
});

export default styles;
