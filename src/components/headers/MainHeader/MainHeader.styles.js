import {StyleSheet, StatusBar} from 'react-native';
import {COLORS, SPACING} from '../../../styles/theme';

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 35,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: -StatusBar.currentHeight, // adjust the height here if needed
  },
  container: {
    paddingHorizontal: SPACING.md,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
  headerContainer: {
    padding: SPACING.md,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    backgroundColor: COLORS.primary,
  },
});

export default styles;
