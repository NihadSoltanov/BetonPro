import React, {useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import API from '../../api/API';
import {Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, Modal, Alert} from 'react-native';
import {AuthContext} from '../../context/AuthProvider';
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
import styles from './Register.styles';
import PasswordInput from '../../components/Inputs/PasswordInput/PasswordInput';
import { IconButton } from '../../components/Buttons';
import { CrossSvg } from '../../assets/icons';
import {useSupportContacts} from '../../hooks/data';
import { useTranslate } from '../../hooks/useTranslate';
import Checkbox from 'expo-checkbox';
import {ROUTES} from '../../routing/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

const data = [
  { label: 'English', value: 'en' },
  { label: 'Lietuvių', value: 'lt' },
  { label: 'Latviešu', value: 'lv' },
  { label: 'Hrvat', value: 'cr' },
];

const regionData = [
  { label: 'Lithuania', value: 'Lithuania' },
  { label: 'Latvia', value: 'Latvia' },
  { label: 'Croatia', value: 'Croatia' },
];


const Register = ({navigation}) => {
  const { t,i18n} = useTranslate();
  const {actions} = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [tax, setTax] = useState(null);
  const [code, setCode] = useState(null);
  const [company, setCompany] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const {supportContacts} = useSupportContacts();
  const [language, setLanguage] = useState(null); 
  const [region, setRegion] = useState(false);

  const [isCompany, setIsCompany] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [eulaVisible, setEulaVisible] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+[0-9]{10,15}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  useFocusEffect(
    React.useCallback(() => {
      const loadStoredCredentials = async () => {
        const storedRegion = await AsyncStorage.getItem('base_url');
        const storedLanguage = await AsyncStorage.getItem('language');
  
        if (storedRegion) onHandleRegion(storedRegion);
        if (storedLanguage) onHandleLanguage(storedLanguage);
      };
  
      loadStoredCredentials();
    }, [])
  );

  const validateRegister = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setErrorMessage(t('register.no_internet'));
        return false;
      }
    });

    if(!name){
      setErrorMessage(t('register.name_required'));
      return false;
    }

    if(!password){
      setErrorMessage(t('register.password_required'));
      return false;
    }

    if(!repeatPassword){
      setErrorMessage(t('register.second_password_required'));
      return false;
    }

    if(password !== repeatPassword) {
      setErrorMessage(
        t('register.passwords_dont_match'),
      );
      return false;
    }

    if(!phone){
      setErrorMessage(t('register.phone_required'));
      return false;
    }

    if(!email){
      setErrorMessage(t('register.email_required'));
      return false;
    }

    if(isCompany && !code){
      setErrorMessage(t('register.company_code_required'));
      return false;
    }

    if(isCompany && !address){
      setErrorMessage(t('register.adress_required'));
      return false;
    }

    if(isCompany && !company){
      setErrorMessage(t('register.company_required'));
      return false;
    }
    
    if(isCompany && (!company || !name || !password || !phone || !region || !address || !code) ){
      setErrorMessage(
        t('register.invalid_user'),
      );
      return false;
    }

    if (!isCompany && (!name || !password || !phone || !region || !email))
    {
      setErrorMessage(
        t('register.invalid_user'),
      );
      return false;
    }

    if(!agreeToTerms){

      setErrorMessage(  
        t('register.agree_to_terms'),
      );
      return false;
    }
    
    if (!passwordRegex.test(password)) {

      setErrorMessage(t('register.invalid_password'));
      return false;
    }  

    if (!phoneRegex.test(phone)) {

      setErrorMessage(t('register.invalid_phone'));
      return false;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage(t('register.invalid_email'));
      return false;
    }

    return true;
  }

  const  handleRegister = () => {
    if(!validateRegister()){
      return;
    }

    if(!code){
      setCode(email);
    }

    if(!tax){
      setTax("");
    }

    setIsLoading(true);


    let data = {}
    if(isCompany){
      data = {name: company, person: name, psw: password,
        tel: phone, email, tax: tax, code:code, privatus:0, address, lang: language, ID:id
        };
    } else {
      data = {name: name, person: name, psw: password,
        tel: phone, email, tax: tax, code:email, privatus:1, address, lang: language, ID:id
        };
    }

    API.register(data)
      .then((resp) => {
        if (resp['success']) {
          setRegistrationSuccessful(true);
        } else {
          setErrorMessage(
            t('register.user_exists'),
          );
        }
      })
      .catch(() => {
        setErrorMessage(t('login.problem_occurred'));
      })
      .finally(() => {
        setIsLoading(false);
      });
    
  };

  const handleGoToLogin = () => {
    setRegistrationSuccessful(false);
    navigation.navigate(ROUTES.LOGIN);
  }

  const onHandleRegion= async (val)=>{
    setRegion(val);
    await AsyncStorage.setItem('base_url', val);
  }

  const onHandleLanguage=async (val)=>{
    setLanguage(val);
    switch (val) {
        case 'en':
            i18n.changeLanguage('en');
            break;
        case 'lv':
            i18n.changeLanguage('lv');
            break;
        case 'lt':
            i18n.changeLanguage('lt');
            break;
        case 'cr':
            i18n.changeLanguage('cr');
            break;
        default:
            i18n.changeLanguage('lt');
            break;
    }
    await AsyncStorage.setItem('language', val);
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <MainHeader
      menuItem={
        <LinkButton
          title={t('register.contacts')}
          onPress={() => {
            if (supportContacts) setIsSupportModalVisible(true);
          }}
        />
      }
    >
      <ScrollView style={styles.wrapper} behavior="padding" enabled>
        <Text style={styles.welcomeMessage}>{t('register.register')}</Text>
        <Box>
        <Dropdown
          title={t('login.select_region')}
          items={regionData}
          value={region}
          onChange={(val) =>
            onHandleRegion(val)
          }
          style={styles.dropdownInput}
        />
        <Dropdown
          value={language}
          title={t('login.select_language')}
          items={data}
          onChange={(val) =>
            onHandleLanguage(val)
              
          }
          style={styles.dropdownInput}
        />
        <Box style={{marginBottom: -20}}></Box>
          <TextInput
              label={
                <Text>
                  {t('register.name')}
                  <Text style={{ color: 'red' }}> *</Text>
                </Text>
              }
              value={name}
              onValueChange={setName}
          />
        <PasswordInput
          label={
          <Text>
            {t('login.password')}
            <Text style={{ color: 'red' }}> *</Text>
          </Text>}
          value={password}
          onValueChange={setPassword}
          />
          <Text style={{marginTop:-15, marginBottom:10}}>{t('register.password_rules')}</Text>
        <PasswordInput
          label={
          <Text>
            {t('register.repeat_password')}
            <Text style={{ color: 'red' }}> *</Text>
          </Text>}
          value={repeatPassword}
          onValueChange={setRepeatPassword}
          />
          <TextInput
            label={
              <Text>
                {t('register.phone')}
                <Text style={{ color: 'red' }}> *</Text>
              </Text>
            }
            value={phone}
            onValueChange={setPhone}
          />
          <TextInput
            label={
              <Text>
                {t('register.email')}
                <Text style={{ color: 'red' }}> *</Text>
              </Text>
            }
            value={email}
            onValueChange={setEmail}
          />
          {isCompany && 
          <TextInput
            label={
              <Text>
                {t('register.company_code')}
                <Text style={{ color: 'red' }}> *</Text>
              </Text>}
            value={code}
            onValueChange={setCode}
          />}
          
          <TextInput
            label={t('register.tax')}
            value={tax}
            onValueChange={setTax}
          />
          <TextInput
            label={isCompany ? 
              <Text>
                {t('register.address')}
                <Text style={{ color: 'red' }}> *</Text>
              </Text> : 
              t('register.address')}
            value={address}
          onValueChange={setAddress}
        />
        <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isCompany} onValueChange={setIsCompany} />
        <Text style={styles.checkLabel}>{t('register.company_type')} </Text>
        </View>
        {isCompany && 
        <TextInput
          label={
            <Text>
              {t('register.company')}
              <Text style={{ color: 'red' }}> *</Text>
            </Text>
          }
          value={company}
          onValueChange={setCompany}
          style={styles.checkLabel}
        />}
          <View style={styles.btnWrapper}>
             <Button
              onPress={handleRegister}
              label={t('register.register')}
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
          <Box style={{marginBottom: -25}}></Box>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          <View style={styles.section}>
            <Checkbox style={styles.checkbox} value={agreeToTerms} onValueChange={setAgreeToTerms} />
              <Text style={styles.checkLabel}>{t('register.eula')}
                <TouchableOpacity 
                  onPress={() => {
                    setEulaVisible(true);
                }}>
                  <Text style={styles.eula}>{t('register.terms')}</Text>
                </TouchableOpacity>
              </Text>
          </View>
        </Box>
        <SupportModal
          isVisible={isSupportModalVisible}
          email={supportContacts?.email}
          person={supportContacts?.person}
          phone={supportContacts?.phone}
          onClose={() => setIsSupportModalVisible(false)}
        />
        <CustomModal isVisible={eulaVisible} onClose={() => setEulaVisible(false)}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setEulaVisible(false)}>
            <IconButton Icon={CrossSvg} onPress={() => setEulaVisible(false)} />
          </TouchableOpacity>
          <ScrollView horizontal={false} style={{marginTop:15}}
          >
            <Text style={styles.title}>{t('register.termsBox')}</Text>
            <Text>{t('register.conditions')}</Text>
          </ScrollView>
        </CustomModal>
        <CustomModal isVisible={registrationSuccessful} onClose={() => setRegistrationSuccessful(false)}>
            <Text style={styles.title}>{t("login.thank_you")}</Text>
            <Text style={styles.text}>{t("login.must_activate")}</Text>
            <Button
              onPress={handleGoToLogin}
              label={t('login.ok')}
              variant="solid"
              loading={isLoading}
              disabled={isLoading}
            />
        </CustomModal>
      </ScrollView>
    </MainHeader>
    </SafeAreaView>
  );
};

export {Register};
