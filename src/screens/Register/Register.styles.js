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
  wrapper: {
    flex: 1,
    flexDirection: 'column'
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
  },
  success: {
    marginTop: SPACING.sm,
    fontSize: 14,
    color: 'green',
    textAlign: 'left',
    marginBottom: 10,
  },
  dropdownInput: {
    marginTop: SPACING.sm
  },
  btnPanel: {
    width: '45%',
  },
  section: {
    flexDirection: 'row',
    marginTop:'3px',
    marginBottom:'4px'
  },
  checkLabel:{
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    marginTop: 5
  },
  checkbox: {
    marginRight: 8,
    marginBottom: 12,
    marginTop: 5
  },
  eula:{
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    marginTop: 0,
    fontWeight: 'bold',
  },
  title:{
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.lg,
    color: COLORS.darkGrey,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 10
  },
  text:{
    color: COLORS.darkGrey,
    fontSize: FONT_SIZE.heading.md,
    marginBottom: 30,
    textAlign: 'center',
  },
  closeButton:{
    position: 'absolute',
    left: -20,
    top: -20,
    zIndex: 10000,
  }
});

export default styles;
