import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  pendingOrderCardActionContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonStyles: {color: COLORS.error, width: 32, height: 32},
  editButtonStyles: {color: COLORS.darkGrey, width: 32, height: 32},
});

export default styles;
