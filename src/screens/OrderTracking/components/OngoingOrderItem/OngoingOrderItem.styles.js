import {StyleSheet} from 'react-native';
import {FONTS, FONT_SIZE, SPACING, COLORS} from '../../../../styles/theme';

const styles = StyleSheet.create({
  amountText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxs,
  },
  amountTextInner: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
  },
  mapTrackButton: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
  },
  actionContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  editButton: {color: COLORS.darkGrey, width: 32, height: 32},
  loaderContainer: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
  },
  editButtonContainer: {
    borderTopColor: COLORS.lightGrey,
    borderTopWidth: 1,
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
  },
  editButtonStyles: {color: COLORS.darkGrey, width: 32, height: 32},
  additionalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: SPACING.xxs,
    flex: 1,
  },
  additionalInfoText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
  },
});

export default styles;
