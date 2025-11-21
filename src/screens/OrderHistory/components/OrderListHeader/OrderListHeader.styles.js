import {StyleSheet} from 'react-native';
import {FONTS, FONT_SIZE, COLORS, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  header: {},
  headerRow: {
    paddingBottom: SPACING.sm,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.md,
    color: COLORS.primary,
  },
  title2: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.md,
    color: COLORS.white,
  },
  filterPills: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default styles;
