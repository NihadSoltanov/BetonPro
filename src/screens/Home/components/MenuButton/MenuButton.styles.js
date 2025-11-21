import {StyleSheet} from 'react-native';
import {
  COLORS,
  RADIUS,
  SPACING,
  FONTS,
  FONT_SIZE,
} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.box,
    display: 'flex',
    flexDirection: 'row',
    padding: SPACING.md,
    paddingHorizontal: SPACING.sm,
    flexWrap: 'nowrap',
    marginVertical: SPACING.xxs,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    color: COLORS.primary,
  },
  linkIcon: {
    width: 15,
    height: 20,
    color: COLORS.primary,
  },
  header: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: FONT_SIZE.heading.sm,
  },
  subText: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: FONT_SIZE.text.xs,
  },
  loaderContainer: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roundedView: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    backgroundColor: 'red',
    alignItems: 'center',
    padding:5,
    marginLeft:20
  },
  circleText: {
    color:COLORS.white,
    fontWeight: 'bold'
  }
});

export default styles;
