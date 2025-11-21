import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING, RADIUS} from '../../styles/theme';

const styles = StyleSheet.create({
  highligtedText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
    flexWrap: 'wrap',
  },
  placeholderText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.lightGrey,
  },
  seperator: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginHorizontal: SPACING.md,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.sm,
    marginBottom: SPACING.xxxlg,
  },
  submitContainer: {
    position: 'absolute',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    bottom: SPACING.lg,
    marginHorizontal: SPACING.md,
  },
  upperInput: {
    borderTopLeftRadius: RADIUS.box,
    borderTopRightRadius: RADIUS.box,
  },
  lowerInput: {
    borderBottomLeftRadius: RADIUS.box,
    borderBottomRightRadius: RADIUS.box,
  },
  commentButton: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  
});

export default styles;
