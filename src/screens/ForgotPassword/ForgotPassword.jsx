import React, {useContext, useState, useEffect } from 'react';
import API from '../../api/API';
import {Text, View, KeyboardAvoidingView,SafeAreaView} from 'react-native';
import {AuthContext} from '../../context/AuthProvider';
import { ROUTES } from '../../routing/routes';
import { CustomModal } from '../../components/Modal/Modal';
import {
  MainHeader,
  TextInput,
  LinkButton,
  Button,
  Box,
  Dropdown,
  SupportModal,
} from '../../components';
import styles from '../Login/Login.styles';
import {useSupportContacts} from '../../hooks/data/useSupportContacts';
import { useTranslate } from '../../hooks/useTranslate';


const ForgotPassword = ({navigation}) => {
  const { t, i18n } = useTranslate();
  const [email, setEmail] = useState('');
  const {supportContacts} = useSupportContacts();
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSentAlert, setEmailSentAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = () => {
    setIsLoading(true);
    API.userExists(email)
    .then((resp) => {
      console.log(resp);
      if (resp['success']) {
        setEmailSentAlert(true);
        setErrorMessage('');
      } else {
        setErrorMessage(t('register.user_doesnt_exist'));
      }
    })
    .catch(() => {
      setErrorMessage(t('login.problem_occurred'));
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  
  return (
    <SafeAreaView style={{flex:1}}>
    <MainHeader
      menuItem={
        <LinkButton
          title={t('login.contacts')}
          onPress={() => {
            if (supportContacts) setIsSupportModalVisible(true);
          }}
        />
      }
    >
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
        <Text style={[styles.welcomeMessage, { marginTop: 50 }]} >{t('login.forgot_password_header')}</Text>
        <Box>
            <TextInput
                label={t('login.email')}
                value={email}
                onValueChange={setEmail}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <View style={styles.btnWrapper}>
                <Button
                onPress={handleSubmit}
                label={t('login.submit')}
                variant="solid"
                loading={isLoading}
                disabled={isLoading}
                buttonStyle={styles.btnPanel}
                />
                <Button
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
                label={t('login.login')}
                variant="solid"
                loading={isLoading}
                disabled={isLoading}
                buttonStyle={styles.btnPanel}
                />
            </View>
        </Box>

        <SupportModal
          isVisible={isSupportModalVisible}
          email={supportContacts?.email}
          person={supportContacts?.person}
          phone={supportContacts?.phone}
          onClose={() => setIsSupportModalVisible(false)}
        />
        <CustomModal isVisible={emailSentAlert} onClose={() => setEmailSentAlert(false)}>
            <Text style={styles.title}>{t('login.email_sent_alert')}</Text>
            <Text style={styles.text}>{t('login.email_sent_alert2')}</Text>
            <Button
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
              label={t('login.ok')}
              variant="solid"
              loading={isLoading}
              disabled={isLoading}
        />
        </CustomModal>
      </KeyboardAvoidingView>
    </MainHeader>
    </SafeAreaView>
  );
};

export {ForgotPassword};
