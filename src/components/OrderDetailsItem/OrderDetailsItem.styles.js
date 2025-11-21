import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: SPACING.xs,
    marginVertical: SPACING.xxs,
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  header: {
    color: COLORS.darkGrey,
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    width: 60,
  },
  label: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default styles;
