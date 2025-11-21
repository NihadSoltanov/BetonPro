import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  welcomeMessage: {
    fontSize: FONT_SIZE.heading.lg,
    color: COLORS.white,
    fontFamily: FONTS.bold,
    paddingBottom: SPACING.xxs,
  },
  loginMessage: {
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.white,
    fontFamily: FONTS.regular,
    paddingBottom: SPACING.lg,
  },
  forgotPassword:{
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },

  rightAlignBox:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    width: '100%',
    marginBottom: -25,
    marginTop: -10,
    paddingTop: -10,
    paddingRight: 0
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    justifyContent: 'space-between'
  },
  error: {
    marginTop: SPACING.sm,
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
    marginBottom: 10,
    marginTop:0
  },
  dropdownInput: {
    marginTop: SPACING.sm
  },
  btnPanel: {
    width: '45%',
  },
  title:{
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.sm,
    color: COLORS.darkGrey,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 10
  },
  text:{
    color: COLORS.darkGrey,
    fontSize: FONT_SIZE.heading.md,
    marginBottom: 30
  },
});

export default styles;
