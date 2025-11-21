import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  Box,
  ProfileButton,
  SecondaryHeader,
  TextInput,
  Loader,
  Button,
  ConfirmModal,
} from '../../components';
import {useUserData} from '../../hooks/data';
import {useLogout} from '../../hooks/useLogout';
import styles from './Profile.styles';
import {COLORS} from '../../styles/theme';
import { useTranslate } from '../../hooks/useTranslate';

const Profile = ({navigation}) => {
  const { t} = useTranslate();
  const {userData, isLoadingUserData} = useUserData();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const {logout, isLoading} = useLogout();

  return (
    <SecondaryHeader
      title={t('profile.profile')} 
      menuItem={<ProfileButton />}
      onBackPress={() => navigation.goBack()}
      footer={
        <View style={styles.submitContainer}>
            <Button
              variant="outlined"
              label={t('profile.disconnect')}
              loading={isLoading}
              onPress={() => setIsConfirmVisible(true)}
              buttonStyle={{ backgroundColor: COLORS.lightGrey }}
              textStyle={{ color: COLORS.error, fontWeight: 'bold' }}   // 🔥 işte bu
            />

        </View>
      }
    >
      <Box>
        {isLoadingUserData && (
          <View style={styles.loaderContainer}>
            <Loader size="large" />
          </View>
        )}
        {!isLoadingUserData && (
          <>
            <TextInput label={t('profile.name')} disabled value={userData?.name} />
            <TextInput label={t('profile.surname')} disabled value={userData?.surname} />
            <TextInput label={t('profile.email')}disabled value={userData?.email} />
            <Text>
            {t('profile.change_if_wish')}
              <Text> {t('profile.contact_us')}</Text>
            </Text>
          </>
        )}
      </Box>
      <Text style={styles.titleText}>{t('profile.about_company')}</Text>
      <Box style={{marginBottom: 100}}>
        {isLoadingUserData && (
          <View style={styles.loaderContainer}>
            <Loader size="large" />
          </View>
        )}
        {!isLoadingUserData && (
          <>
            <TextInput label={t('profile.firm')} disabled value={userData?.companyName} />
            <TextInput
              label={t('profile.company_code')}
              disabled
              value={userData?.companyCode}
            />
          </>
        )}
      </Box>
      <ConfirmModal
        isOpen={isConfirmVisible}
        onClose={() => setIsConfirmVisible(false)}
        onConfirm={logout}
        isLoading={isLoading}
        title={t('profile.want_to_logout')}
        cancelButtonText={t('profile.cancel')}
        confirmButtonText={t('profile.disconnect')}
      />
    </SecondaryHeader>
  );
};

export {Profile};
