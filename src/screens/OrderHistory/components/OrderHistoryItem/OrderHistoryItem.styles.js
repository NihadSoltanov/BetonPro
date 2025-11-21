import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  deliveryItemWrapper: {
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  orderItem: {
    marginHorizontal: SPACING.md,
  },
  unsignedDocumentNotification: {
    backgroundColor: COLORS.error,
    borderRadius: 50,
    textAlign: 'center',
    position: 'absolute',
    zIndex: 9999,
    top: -SPACING.sm,
    right: -SPACING.sm,
    paddingHorizontal: 8,
    paddingTop: 2,
  },
  unsignedDocumentNotificationText: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.text.xs,
  },
});

export default styles;
