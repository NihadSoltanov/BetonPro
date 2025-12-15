import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import {
  Box,
  ProfileButton,
  SecondaryHeader,
  TextInput,
  Loader,
  Button,
  ConfirmModal,
} from '../../components';
import { useUserData } from '../../hooks/data';
import { useLogout } from '../../hooks/useLogout';
import styles from './Profile.styles';
import { COLORS } from '../../styles/theme';
import { useTranslate } from '../../hooks/useTranslate';
import API from '../../api/API';

const Profile = ({ navigation }) => {
  const { t } = useTranslate();
  const { userData, isLoadingUserData } = useUserData();

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const { logout, isLoading } = useLogout();
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ DELETE ACCOUNT HANDLER
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);

      const res = await API.deactivateUser();
      console.log('🧨 DELETE RESPONSE:', res);

      if (res?.success) {
        Alert.alert(
          t('profile.deleted'),
          t('profile.account_deactivated'),
          [
            {
              text: 'OK',
              onPress: logout,
            },
          ],
        );
      } else {
        Alert.alert('Error', 'Account could not be deactivated.');
      }

    } catch (e) {
      console.log('❌ DELETE ERROR:', e);
      Alert.alert('Error', 'Server error.');
    } finally {
      setIsDeleting(false);
      setIsDeleteVisible(false);
    }
  };

  return (
    <SecondaryHeader
      title={t('profile.profile')}
      menuItem={<ProfileButton />}
      onBackPress={() => navigation.goBack()}


      footer={
        <View style={styles.submitContainer}>


          <Button
            variant="outlined"
            label={t('profile.delete_account')}
            loading={isDeleting}
            onPress={() => setIsDeleteVisible(true)}
            buttonStyle={{ backgroundColor: COLORS.lightGrey }}
            textStyle={{ color: COLORS.error, fontWeight: 'bold' }}
          />


          <Button
            variant="outlined"
            label={t('profile.disconnect')}
            loading={isLoading}
            onPress={() => setIsConfirmVisible(true)}
            buttonStyle={{ backgroundColor: COLORS.lightGrey }}
            textStyle={{ color: COLORS.error, fontWeight: 'bold' }}
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
            <TextInput label={t('profile.email')} disabled value={userData?.email} />
            <Text>
              {t('profile.change_if_wish')}
              <Text> {t('profile.contact_us')}</Text>
            </Text>
          </>
        )}
      </Box>


      <Text style={styles.titleText}>{t('profile.about_company')}</Text>

      <Box style={{ marginBottom: 100 }}>
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


      <ConfirmModal
        isOpen={isDeleteVisible}
        onClose={() => setIsDeleteVisible(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isDeleting}
        title={t('profile.want_to_delete')}
        cancelButtonText={t('profile.cancel')}
        confirmButtonText={t('profile.delete_account')}
      />

    </SecondaryHeader>
  );
};

export { Profile };
