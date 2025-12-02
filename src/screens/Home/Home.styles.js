import {StyleSheet} from 'react-native';
import {SPACING} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  supportButtonContainer: {
    paddingTop: SPACING.sm,
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },

  newOrderButtonContainer: {
    width: '70%',
    maxWidth: 220,
    alignSelf: 'flex-end',
    marginTop: 350,
    marginBottom: SPACING.lg
  },
});

export default styles;
