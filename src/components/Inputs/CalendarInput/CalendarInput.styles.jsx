import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, FONTS } from '../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthArrow: {
    width: 24,
    height: 24,
    color: COLORS.primary,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.md,
    color: COLORS.primary,
  },
});

export default styles;
