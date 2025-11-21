import React from 'react';
import {Text, View} from 'react-native';
import {Button} from '../../components';
import styles from './ErrorScreen.styles';
import {ROUTES} from '../../routing/routes';
import { useTranslate } from '../../hooks/useTranslate';

const ErrorScreen = ({navigation}) => {
  const { t} = useTranslate();
  return (
    <View style={styles.background}>
      <View style={styles.messageContainer}>
        <View style={styles.topGraphic} />
        <View style={styles.message}>
          <Text style={styles.header}>{t('error_form.error')}</Text>
          <Text style={styles.status}>404</Text>
          <Text style={styles.messageText}>
          {t('error_form.message')}
          </Text>
        </View>
        <View style={styles.bottomGraphic} />
      </View>
      <View style={styles.actions}>
        <Button
          label={t('error_form.try_again')}
          variant="outlined"
          buttonStyle={styles.retryButton}
          textStyle={styles.textStyle}
          onPress={() => navigation.goBack()}
        />
        <Button
          label={t('error_form.to_come_back')}
          variant="solid"
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: ROUTES.HOME}]})
          }
        />
      </View>
    </View>
  );
};

export {ErrorScreen};
