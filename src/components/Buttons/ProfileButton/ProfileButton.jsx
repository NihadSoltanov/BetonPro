import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ProfileSvg} from '../../../assets/icons';
import styles from './ProfileButton.styles';
import {Loader} from '../../Loader/Loader';
import {COLORS} from '../../../styles/theme';

const ProfileButton = ({onPress, title, isLoading}) => {
  let iconStyle = {...styles.icon};
  if (!title) iconStyle = {...styles.icon, ...styles.iconBig};

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {!isLoading && <ProfileSvg {...iconStyle} />}
      {!isLoading && title && <Text style={styles.label}>{title}</Text>}
      {isLoading && <Loader size="large" color={COLORS.white} />}
    </TouchableOpacity>
  );
};

export {ProfileButton};
