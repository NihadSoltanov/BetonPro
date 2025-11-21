import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, RADIUS, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.md,
    paddingBottom: 200,
  },
  durationText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xs,
    color: COLORS.primary,
    paddingLeft: SPACING.md,
  },
  durationButtons: {marginHorizontal: SPACING.md},
  pillButton: {paddingVertical: SPACING.xxs},
  pillButtonContainer: {marginRight: SPACING.xxs, marginBottom: SPACING.xxs},
  pillButtonText: {fontFamily: FONTS.regular},
  submitContainer: {
    position: 'absolute',
    flex: 1,
    display: 'flex',
    gap: SPACING.xxs,
    bottom: SPACING.xxlg,
    paddingHorizontal: SPACING.md,
    width: '100%',
  },
  resetFiltersButton: {
    backgroundColor: COLORS.white,
  },
  dateInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.xs,
    paddingBottom: SPACING.sm,
  },
  dateContainer: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.box,
  },
  calendarLinkButtonContainer: {
    width: 140,
    marginTop: SPACING.sm,
  },
  dropdownInput: {
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
});

export default styles;
