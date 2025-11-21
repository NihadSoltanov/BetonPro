import React from 'react';
import {Text, View} from 'react-native';
import styles from './SigningPill.styles';
import { useTranslate } from '../../hooks/useTranslate';

const SigningPill = ({signed}) => {
  const { t} = useTranslate();
  return (<View style={styles.signingPillContainer}>
    <Text style={[styles.pill, signed && styles.signedPill]}>
      {signed ? t('signing_pill.signed')  : t('signing_pill.signature_required')}
    </Text>
  </View>);
};

export {SigningPill};
