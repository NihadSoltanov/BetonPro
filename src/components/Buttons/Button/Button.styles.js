import {StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE, RADIUS, FONTS, SPACING} from '../../../styles/theme';

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: RADIUS.button,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    width: '100%',
  },
  buttonSolid: {
    backgroundColor: COLORS.accent,
  },
  buttonDanger: {
    backgroundColor: COLORS.error,
  },
  buttonSolidDangerDisabled: {
    backgroundColor: COLORS.error,
    opacity: 0.5,
  },
  buttonOutlined: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    color: COLORS.primary,
  },
  buttonOutlinedDisabled: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    opacity: 0.5,
  },
label: {
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.primary,
    alignSelf: 'center',
    fontFamily: FONTS.bold,
},

  icon: {
    color: COLORS.primary,
    width: 19,
    height: 19,
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textDanger: {
    color: COLORS.white,
  },
});

export default styles;
