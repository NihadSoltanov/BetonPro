import React from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {IconButton, LinkButton} from '../Buttons';
import styles from './SupportModal.styles';
import {CustomModal} from '../Modal/Modal';
import {CrossSvg, MailSvg, PhoneSvg} from '../../assets/icons';
import { useTranslate } from '../../hooks/useTranslate';

const SupportModal = ({isVisible, onClose, person, phone, email}) => {
  const { t} = useTranslate();
 return (<CustomModal isVisible={isVisible} onPress={onClose}>
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <IconButton Icon={CrossSvg} onPress={onClose} />
    </TouchableOpacity>
    <Text style={styles.title}>{t('home.contacts')} </Text>
    <View style={styles.container}>
      <LinkButton title={person} variant="primary" Icon={MailSvg} />
      <LinkButton
        title={phone}
        variant="primary"
        Icon={PhoneSvg}
        onPress={() => Linking.openURL(`tel:${phone}`)}
      />
      <LinkButton
        title={email}
        variant="primary"
        Icon={MailSvg}
        onPress={() => Linking.openURL(`mailto:${email}`)}
      />
    </View>
  </CustomModal>)
};

export {SupportModal};
