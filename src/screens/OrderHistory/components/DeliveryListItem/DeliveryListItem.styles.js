import {StyleSheet} from 'react-native';
import {COLORS, FONTS, FONT_SIZE, SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
  boldText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZE.heading.xxs,
    color: COLORS.darkGrey,
  },
  seperator: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
    paddingHorizontal: SPACING.xxs,
  },
  regularText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.sm,
    color: COLORS.darkGrey,
  },
  subText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.darkGrey,
  },
  smallSeparator: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.text.xxs,
    color: COLORS.darkGrey,
    paddingHorizontal: SPACING.xxs,
  },
  rootContainer: {
    marginTop: SPACING.sm,
  },
measurementsContainer: {
  marginTop: 6,
  marginLeft: 34,   // At plant hizası
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
  marginLeft: 0,
  paddingLeft: 0,
},

measurementsText: {
  fontSize: 11,
  color: '#555',
  marginLeft: 0,
  paddingLeft: 0,
},
deliveryDivider: {
  height: 1,
  backgroundColor: COLORS.lightGrey,
  marginTop: SPACING.sm,
  marginLeft: 34,   // icon + padding sonrası ana text hizası
},



});

export default styles;
