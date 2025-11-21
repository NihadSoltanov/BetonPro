import {StyleSheet} from 'react-native';
import {RADIUS} from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    height: 12,
    flex: 1,
  },
  statusItem: {
    borderRadius: RADIUS.button,
    height: 12,
    position: 'absolute',
  },
});

export default styles;
