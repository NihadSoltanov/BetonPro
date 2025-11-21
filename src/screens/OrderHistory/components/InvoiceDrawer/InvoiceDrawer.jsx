import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, Easing, Pressable, AccessibilityInfo} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './InvoiceDrawer.styles';
import {BottomDrawerWithOverlay, Button} from '../../../../components';
import {DownloadSvg} from '../../../../assets/icons';
import {openFileLink} from '../../../../util/FileSystemUtils';
import {getBaseUrl, getUserName, getUserPsw} from '../../../../util/TokenUtil';
import {useTranslate} from '../../../../hooks/useTranslate';

const Toast = ({visible, type = 'success', title, message, onClose, topOffset = 12, onScreen = false}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {toValue: 1, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        Animated.timing(translateY, {toValue: 0, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
      ]).start();
      AccessibilityInfo.announceForAccessibility?.(title || message || '');
    } else {
      Animated.parallel([
        Animated.timing(opacity, {toValue: 0, duration: 180, useNativeDriver: true, easing: Easing.in(Easing.cubic)}),
        Animated.timing(translateY, {toValue: 10, duration: 180, useNativeDriver: true, easing: Easing.in(Easing.cubic)}),
      ]).start();
    }
  }, [visible, opacity, translateY, title, message]);

  const bg = type === 'success' ? '#0FA958' : type === 'warning' ? '#E5A100' : '#D93C3C';
  const icon = type === 'success' ? '✓' : type === 'warning' ? '!' : '✕';

  const containerStyle = onScreen
    ? {position: 'absolute', left: 16, right: 16, top: topOffset, zIndex: 9999, elevation: 9999, opacity, transform: [{translateY}]}
    : {position: 'absolute', left: 16, right: 16, top: topOffset, opacity, transform: [{translateY}]};

  if (!visible && opacity.__getValue() === 0) return null;

  return (
    <Animated.View pointerEvents="box-none" style={containerStyle}>
      <Pressable
        onPress={onClose}
        style={{
          backgroundColor: bg,
          borderRadius: 14,
          paddingVertical: 12,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.16,
          shadowRadius: 12,
          shadowOffset: {width: 0, height: 4},
          elevation: 3,
        }}>
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.18)',
            marginRight: 10,
          }}>
          <Text style={{color: '#fff', fontWeight: '700'}}>{icon}</Text>
        </View>
        <View style={{flex: 1}}>
          {!!title && <Text style={{color: '#fff', fontWeight: '700', fontSize: 15, marginBottom: message ? 2 : 0}}>{title}</Text>}
          {!!message && <Text style={{color: '#fff', fontSize: 13, opacity: 0.95}}>{message}</Text>}
        </View>
        <Text style={{color: 'rgba(255,255,255,0.9)', marginLeft: 8, fontWeight: '600'}}>OK</Text>
      </Pressable>
    </Animated.View>
  );
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForPdfReady(url, {maxRetries = 5, delayMs = 1500} = {}) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, {method: 'HEAD', headers: {Accept: 'application/pdf'}});
      const ct = res.headers?.get?.('content-type') || '';
      if (res.ok && ct.toLowerCase().includes('pdf')) return true;

      if (res.ok && !ct) {
        const probe = await fetch(url, {method: 'GET', headers: {Range: 'bytes=0-0', Accept: 'application/pdf'}});
        const ct2 = probe.headers?.get?.('content-type') || '';
        if (probe.ok && ct2.toLowerCase().includes('pdf')) return true;
      }
    } catch {}
    await sleep(delayMs);
  }
  return false;
}

const InvoiceDrawer = ({onClose, isVisible, order}) => {
  const {t} = useTranslate();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({visible: false, type: 'success', title: '', message: ''});
  const hideToastTimer = useRef();

  const showToast = (type, title, message, duration = 3500) => {
    if (hideToastTimer.current) clearTimeout(hideToastTimer.current);
    setToast({visible: true, type, title, message});
    hideToastTimer.current = setTimeout(() => setToast((prev) => ({...prev, visible: false})), duration);
  };

  const handleDownloadInvoice = async (invoiceId, db) => {
    setIsLoading(true);
    try {
      const userName = await getUserName();
      const userPsw = await getUserPsw();
      const base = await getBaseUrl();
      if (!invoiceId || !userName || !userPsw || !base) {
        showToast('error', t('order_history_form.invoice_drawer.vat_invoice'), t('order_history_form.waybill_send_mail.open_error') || 'Could not open');
        return;
      }

      const ts = Date.now();
      const pdfUrl = `${base}/getInvoice&f_id=${invoiceId}&db=${db}&user=${userName}&psw=${userPsw}&ts=${ts}`;

      const ready = await waitForPdfReady(pdfUrl, {maxRetries: 5, delayMs: 1500});
      if (!ready) {
        showToast('error', t('order_history_form.invoice_drawer.vat_invoice'), t('order_history_form.waybill_send_mail.open_error') || 'Could not open');
        return;
      }

      await openFileLink(pdfUrl);
      showToast('success', t('order_history_form.invoice_drawer.vat_invoice'), t('order_history_form.waybill_send_mail.open_success') || 'Opened successfully');
    } catch {
      showToast('error', t('order_history_form.invoice_drawer.vat_invoice'), t('order_history_form.waybill_send_mail.open_error') || 'Could not open');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => () => hideToastTimer.current && clearTimeout(hideToastTimer.current), []);

  return (
    <BottomDrawerWithOverlay isVisible={isVisible} onClose={onClose}>
      <Toast
        visible={toast.visible}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({...prev, visible: false}))}
        onScreen
        topOffset={Math.max(insets.top, 10) + 8}
      />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Button
            variant="outlined"
            label={t('order_history_form.invoice_drawer.vat_invoice')}
            Icon={DownloadSvg}
            onPress={() => handleDownloadInvoice(order?.invoiceId, order?.db)}
            loading={isLoading}
            buttonStyle={{justifyContent: 'center'}}
          />
        </View>
      </View>
    </BottomDrawerWithOverlay>
  );
};

export {InvoiceDrawer};
