import {StyleSheet} from 'react-native';
import {SPACING, FONTS, FONT_SIZE, COLORS} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.sm,
  },
  dateButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
    alignItems: 'center',
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: SPACING.md,
  },
  dateButtonText: {
    fontSize: FONT_SIZE.text.xs,
  },
  valueDisplay: {
    fontFamily: FONTS.bold,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: FONT_SIZE.heading.sm,
    color: COLORS.darkGrey,
    paddingVertical: SPACING.sm,
    borderColor: COLORS.lightGrey,
  },
  submitButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
  },
});

export default styles;
