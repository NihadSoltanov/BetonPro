import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from './EditModal.styles';
import {Modal, Button, TextInput} from '../../../../components';
import {InfoSvg} from '../../../../assets/icons';
import {COLORS} from '../../../../styles/theme';
import { useTranslate } from '../../../../hooks/useTranslate';

const EditModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  deliveryAmounts,
}) => {
  const { t} = useTranslate();
  const [amount, setAmount] = useState(deliveryAmounts?.initialAmount);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [error, setError] = useState(null);
  const measurement = 'm3';

  useEffect(() => {
    if (deliveryAmounts) {
      const {totalAmount, onSiteAmount, transitAmount, deliveredAmount} =
        deliveryAmounts;
      const tenPercentOffTotal = totalAmount * 0.1;
      if (!amount) setAmount(parseFloat(totalAmount)?.toString());
      const minAmountCalculated =
        onSiteAmount + transitAmount + deliveredAmount;

      setMinAmount(
        Number.isNaN(minAmountCalculated)
          ? 1
          : parseFloat(minAmountCalculated).toFixed(2),
      );
      setMaxAmount((totalAmount + tenPercentOffTotal).toFixed(2));
    }
  }, [deliveryAmounts]);

  const validateForm = (val) => {
    if (parseFloat(val) > maxAmount || parseFloat(val) < minAmount) {
      setError(t('order_tracking_form.edit_modal.invalid_quantity'));
      return false;
    }
    setError(null);
    return true;
  };

  const onFormSubmit = (val) => {
    const isFormValid = validateForm(val);
    if (isFormValid) onConfirm(val);
  };

  const onChangeValue = (val) => {
    if (error) setError(null);
    setAmount(val);
  };

  return (
    <Modal isVisible={isOpen} onClose={onClose}>
      <Text style={styles.title}>{t('order_tracking_form.edit_modal.edit_order_quantity')}</Text>
      <Text style={styles.text}>
      {t('order_tracking_form.edit_modal.you_can_edit')}
      </Text>
      <View style={styles.amountRow}>
        <Text style={styles.amountText}>{t('new_preview_order_form.quantity')}</Text>
        <View style={styles.amountInput}>
          <TextInput
            keyboardType="numeric"
            value={amount}
            onValueChange={(val) => onChangeValue(val)}
            style={{marginBottom: 0}}
          />
          <Text style={styles.measurementUnitText}>{measurement}</Text>
        </View>
      </View>
      <View style={styles.disclaimer}>
        <InfoSvg color={error ? COLORS.error : COLORS.darkGrey} />
        <Text style={[styles.disclaimerText, error && styles.error]}>
          {`${
            error ? error : ''
          }${t('order_tracking_form.edit_modal.quantity_range')}: ${minAmount} - ${maxAmount} ${measurement}`}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View flex={1}>
          <Button
            onPress={onClose}
            label={t('order_tracking_form.edit_modal.cancel')}
            variant="outlined"
            buttonStyle={styles.noPadding}
            loading={isLoading}
          />
        </View>
        <View flex={1}>
          <Button
            onPress={() => onFormSubmit(amount)}
            label={t('order_tracking_form.edit_modal.save_changes')}
            variant="solid"
            loading={isLoading}
            buttonStyle={styles.actionButton}
            textStyle={styles.saveButtonText}
          />
        </View>
      </View>
    </Modal>
  );
};

export {EditModal};
