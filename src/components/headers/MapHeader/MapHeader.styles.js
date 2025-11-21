import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../styles/theme';

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    backgroundColor: `${COLORS.primary}CC`,
    flex: 1,
  },
  logo: {
    width: 120,
    height: 35,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    height: 240,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  headerContainer: {
    padding: SPACING.md,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 34,
    height: 34,
    color: COLORS.white,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.md,
    color: COLORS.white,
  },
  subHeaderContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
