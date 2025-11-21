import {StyleSheet} from 'react-native';
import {COLORS, SPACING, FONTS, FONT_SIZE} from '../../../../styles/theme';

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.sm,
    color: COLORS.darkGrey,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: SPACING.md,
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.xxs,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
    textAlign: 'center',
  },
  actionButton: {
    paddingVertical: SPACING.xxs,
    height: 60,
    justifyContent: 'center',
  },
  saveButtonText: {textAlign: 'center'},
  amountRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: SPACING.xs,
  },
  amountInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  amountText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  disclaimerText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.darkGrey,
    opacity: 0.6,
  },
  disclaimer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.xxs,
    alignItems: 'center',
  },
  error: {
    color: COLORS.error,
  },
});

export default styles;
