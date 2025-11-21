import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 55,
    left: 15,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#000', // Change this color as per your design
    zIndex: 1,
  },
  title: {
    marginBottom: 100,
    marginRight: 210,
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',

    position: 'absolute',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  sortButton: {
    backgroundColor: '#008e46',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    elevation: 3,
  },
  sortButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
