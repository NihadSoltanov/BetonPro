import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from '../../../../../../styles/theme';

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
    lineHeight: FONT_SIZE.heading.xs,
    marginLeft: SPACING.lg,
  },
  headerSubtext: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  headerPoint: {
    borderRadius: RADIUS.button,
    borderWidth: 1.5,
    width: 10,
    height: 10,
    position: 'absolute',
    left: -6,
    top: 0,
    zIndex: 99,
    backgroundColor: COLORS.white,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'center',
  },
  statusText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xs,
    color: COLORS.darkGrey,
    lineHeight: FONT_SIZE.text.sm,
    marginLeft: SPACING.lg,
  },
  container: {
    borderLeftWidth: 2,
    marginLeft: SPACING.xs,
    paddingBottom: SPACING.md,
  },
  noBorder: {
    borderColor: COLORS.white,
  },
 measurementsContainer: {
   marginTop: 6,
   marginLeft: SPACING.lg, // headerText ile birebir aynı
 },
  measurementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  measurementsBlock: {
    flex: 1,
  },
  measurementsTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555',
    marginBottom: 2,
  },
  measurementsText: {
    fontSize: 11,
    color: '#555',
  },
  deliveryDivider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginTop: SPACING.sm,
    marginLeft: SPACING.lg,   // timeline text ile hizalı
  },


});

export default styles;
