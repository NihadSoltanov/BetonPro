import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING, RADIUS} from '../../styles/theme';

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    position: 'relative',
  },
  retryButton: {
    borderColor: COLORS.white,
  },
  textStyle: {
    color: COLORS.white,
  },
  message: {
    backgroundColor: COLORS.lightGrey,
    marginHorizontal: SPACING.md,
    borderTopLeftRadius: RADIUS.graphics,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 66,
    paddingBottom: 78,
    zIndex: 1,
  },
  header: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xlg,
    color: COLORS.primary,
    lineHeight: 45,
  },
  status: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxlg,
    color: COLORS.primary,
    lineHeight: 150,
  },
  messageText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.md,
    color: COLORS.primary,
    paddingHorizontal: 48,
    textAlign: 'center',
  },
  actions: {
    paddingHorizontal: SPACING.md,
    position: 'absolute',
    bottom: 10,
    gap: SPACING.xxs,
    width: '100%',
  },
  topGraphic: {
    borderTopLeftRadius: RADIUS.graphics,
    backgroundColor: COLORS.error,
    width: 143,
    height: 100,
    position: 'absolute',
    right: 0,
    top: -50,
  },
  bottomGraphic: {
    borderBottomRightRadius: RADIUS.graphics,
    backgroundColor: COLORS.purple,
    width: 143,
    height: 100,
    position: 'absolute',
    left: 0,
    bottom: -50,
    zIndex: 2,
  },
  messageContainer: {position: 'relative', marginTop: 96},
});

export default styles;
