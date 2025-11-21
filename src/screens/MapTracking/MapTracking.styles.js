import {StyleSheet, Dimensions} from 'react-native';
import {SPACING} from '../../styles/theme';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapTypeButton: {
    position: 'absolute',
    top: SPACING.xs,
    left: width - 40 - SPACING.md,
    zIndex: 10,
  },
});

export default styles;
