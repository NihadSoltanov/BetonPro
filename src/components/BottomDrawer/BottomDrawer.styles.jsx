import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  drawer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 0,
    position: 'absolute',
    bottom: 0,
  },
  drawerArrow: {
    color: COLORS.darkGrey,
    width: 38,
    height: 14,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.xs,
  },
});

export default styles;
