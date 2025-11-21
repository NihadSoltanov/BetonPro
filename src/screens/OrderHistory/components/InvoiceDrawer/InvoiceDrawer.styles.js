import {StyleSheet} from 'react-native';
import {SPACING} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '75%',
  },
});

export default styles;
