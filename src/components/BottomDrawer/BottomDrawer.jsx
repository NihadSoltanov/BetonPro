import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Box} from '../Box/Box';
import styles from './BottomDrawer.styles';
import {DrawerArrowSvg} from '../../assets/icons';

const BottomDrawer = ({children, onClose, isVisible}) => {
  if (!isVisible) return <></>;

  return (
    <Box style={styles.drawer}>
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={onClose}>
          <DrawerArrowSvg {...styles.drawerArrow} />
        </TouchableOpacity>
      </View>
      {children}
    </Box>
  );
};

export {BottomDrawer};
