import React, { useContext, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import API from '../../api/API';
import { Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';
import { CustomModal } from '../../components/Modal/Modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  MainHeader,
  TextInput,
  LinkButton,
  Button,
  Box,
  Dropdown,
  SupportModal,
} from '../../components';
import styles from './Login.styles';
import PasswordInput from '../../components/Inputs/PasswordInput/PasswordInput';
import { useSupportContacts } from '../../hooks/data/useSupportContacts';
import { useTranslate } from '../../hooks/useTranslate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../../routing/routes';

const data = [
  { label: 'English', value: 'en' },
  { label: 'Lietuvių', value: 'lt' },
  { label: 'Latviešu', value: 'lv' },
  { label: 'Hrvat', value: 'cr' },
];

const regionData = [
  { label: 'Lithuania', value: 'HMobile' },
];

const Login = ({ navigation }) => {
  const { t, i18n } = useTranslate();
  const { actions } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [language, setLanguage] = useState(null);
  const [region, setRegion] = useState('Lithuania');
  const { supportContacts } = useSupportContacts();
  const [registerAlert, setRegisterAlert] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadStoredCredentials = async () => {
        const storedEmail = await AsyncStorage.getItem('user');
        const storedPassword = await AsyncStorage.getItem('psw');
        const storedRegion = await AsyncStorage.getItem('base_url');
        const storedLanguage = await AsyncStorage.getItem('language');

        if (storedEmail) setEmail(storedEmail);
        if (storedPassword) setPassword(storedPassword);
        if (storedRegion) onHandleRegion(storedRegion);
        if (storedLanguage) onHandleLanguage(storedLanguage);
      };

      loadStoredCredentials();
      setErrorMessage(null);
    }, [])
  );

  const handleRegisterClick = () => setRegisterAlert(true);
  const handleRegister = () => {
    setRegisterAlert(false);
    navigation.navigate(ROUTES.REGISTER);
  };

  const handleLogin = () => {
    if (!region) {
      setErrorMessage(t('login.no_region'));
      return;
    }

    if (!email || !password || !email.trim() || !password.trim()) {
      setErrorMessage(t('login.invalid_user'));
    } else {
      setIsLoading(true);
      console.log(' Login çağrısı:', { username: email, password, region });

      API.login({ username: email, password, region })
        .then(async (res) => {
          if (res['success']) {
            actions.updateAccessToken(res.accessToken, res.user, res.psw);
            actions.updateAgreement(res.agreement);
            await AsyncStorage.setItem('user', email);
            await AsyncStorage.setItem('psw', password);
            setErrorMessage(null);

            try {
              const userDetails = await API.getUserData();
              if (userDetails?.email) {
                await AsyncStorage.setItem('user_email', userDetails.email);
              }
            } catch (e) {}
          } else if (res?.active === false) {
            setErrorMessage(t('login.user_not_activated'));
          } else {
            setErrorMessage(t('login.invalid_user'));
          }
        })
        .catch(() => setErrorMessage(t('login.problem_occurred')))
        .finally(() => setIsLoading(false));
    }
  };

  const onHandleRegion = async (val) => {
    setRegion(val);
    await AsyncStorage.setItem('base_url', val);
  };

  const onHandleLanguage = async (val) => {
    setLanguage(val);
    switch (val) {
      case 'en':
      case 'lv':
      case 'lt':
      case 'cr':
        i18n.changeLanguage(val);
        break;
      default:
        i18n.changeLanguage('lt');
        break;
    }
    await AsyncStorage.setItem('language', val);
  };

  const getContactsByRegion = () => {
    if (region === 'HMobile') {
      return {
        person: 'Pardavimai',
        phone: '+370 69002555',
        email: 'uzsakymai@hmobile.lt',
      };
    }
    return {
      person: supportContacts?.person,
      phone: supportContacts?.phone,
      email: supportContacts?.email,
    };
  };

  const currentContacts = getContactsByRegion();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <Text style={styles.welcomeMessage}>{t('login.welcome_back')}</Text>
          <Text style={styles.loginMessage}>{t('login.log_in')}</Text>

          <Box>
            <TextInput
              label={t('login.email')}
              value={email}
              onValueChange={setEmail}
            />
            <PasswordInput
              label={t('login.password')}
              value={password}
              onValueChange={setPassword}
            />

            <Box style={styles.rightAlignBox}>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
              >
                <Text style={styles.forgotPassword}>
                  {t('login.forgot_password')}
                </Text>
              </TouchableOpacity>
            </Box>

            <Dropdown
              title={t('login.select_region')}
              items={regionData}
              value={region}
              onChange={onHandleRegion}
              style={styles.dropdownInput}
            />
            <Dropdown
              value={language}
              title={t('login.select_language')}
              items={data}
              onChange={onHandleLanguage}
              style={styles.dropdownInput}
            />

            <View style={styles.btnWrapper}>
              <Button
                onPress={handleLogin}
                label={t('login.login')}
                variant="solid"
                loading={isLoading}
                disabled={isLoading}
                buttonStyle={styles.btnPanel}
              />
              <Button
                onPress={handleRegisterClick}
                label={t('login.register')}
                variant="solid"
                loading={isLoading}
                disabled={isLoading}
                buttonStyle={styles.btnPanel}
              />
            </View>

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </Box>

          <SupportModal
            isVisible={isSupportModalVisible}
            email={currentContacts.email}
            person={currentContacts.person}
            phone={currentContacts.phone}
            onClose={() => setIsSupportModalVisible(false)}
          />

          <CustomModal
            isVisible={registerAlert}
            onClose={() => setRegisterAlert(false)}
          >
            <Text style={styles.title}>{t('login.register_alert')}</Text>
            <Button
              onPress={handleRegister}
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

export { Login };
