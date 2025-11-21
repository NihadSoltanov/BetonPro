import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, Easing, Pressable, AccessibilityInfo, Modal, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './WaybillDrawer.styles';
import {BottomDrawerWithOverlay, Button} from '../../../../components';
import {DownloadSvg, SendSvg, PenSvg} from '../../../../assets/icons';
import {getBaseUrl, getUserName, getUserPsw, getUserEmail} from '../../../../util/TokenUtil';
import {openFileLink} from '../../../../util/FileSystemUtils';
import {useSignDelivery} from '../../../../hooks/data';
import {useTranslate} from '../../../../hooks/useTranslate';


const Toast = ({visible, type = 'success', title, message, onClose, topOffset = 12}) => {
  const [showModal, setShowModal] = useState(visible);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.timing(opacity, {toValue: 1, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        Animated.timing(translateY, {toValue: 0, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
      ]).start();
      AccessibilityInfo.announceForAccessibility?.(title || message || '');
    } else {
      Animated.parallel([
        Animated.timing(opacity, {toValue: 0, duration: 180, useNativeDriver: true, easing: Easing.in(Easing.cubic)}),
        Animated.timing(translateY, {toValue: 10, duration: 180, useNativeDriver: true, easing: Easing.in(Easing.cubic)}),
      ]).start(({finished}) => finished && setShowModal(false));
    }
  }, [visible, title, message, opacity, translateY]);

  if (!showModal) return null;

  const bg   = type === 'success' ? '#0FA958' : type === 'warning' ? '#E5A100' : '#D93C3C';
  const icon = type === 'success' ? '✓' : type === 'warning' ? '!' : '✕';

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="none"
      visible={showModal}
      onRequestClose={onClose}
      hardwareAccelerated
      presentationStyle="overFullScreen"
    >
      <View pointerEvents="box-none" style={{flex: 1, justifyContent: 'flex-start'}}>
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            top: topOffset,
            opacity,
            transform: [{translateY}],
          }}>
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
              elevation: Platform.OS === 'android' ? 6 : 0,
            }}>
            <View
              style={{
                width: 26, height: 26, borderRadius: 13,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.18)', marginRight: 10,
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
      </View>
    </Modal>
  );
};

/* ---------- Helpers ---------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const tt = (tfn, key, fallback) => {
  const v = tfn(key);
  return v && v !== key ? v : fallback;
};

// Build alternative endpoints: act=/getWayBill | act=getWayBill
const buildWaybillUrls = (base, {id, db}, userName, userPsw, ts) => {
  const q = `t_id=${id}&db=${db}&user=${encodeURIComponent(userName)}&psw=${encodeURIComponent(userPsw)}&ts=${ts}`;
  const u1 = `${base}/getWayBill&${q}`;
  const u2 = base.replace(/act=?$/, 'act=getWayBill') + `&${q}`;
  const u3 = base.replace(/act=?$/, 'act=/getWayBill') + `&${q}`;
  return Array.from(new Set([u1, u2, u3]));
};

async function probePdf(url) {
  try {
    const head = await fetch(url, {method: 'HEAD', headers: {Accept: 'application/pdf'}});
    const ct = head.headers?.get?.('content-type')?.toLowerCase() || '';
    if (head.ok && ct.includes('pdf')) return true;
  } catch {}
  try {
    const get = await fetch(url, {method: 'GET', headers: {Accept: 'application/pdf'}, cache: 'no-store'});
    const ct2 = get.headers?.get?.('content-type')?.toLowerCase() || '';
    if (get.ok && ct2.includes('pdf')) return true;
  } catch {}
  return false;
}

async function waitForPdfReady(urls, {maxRetries = 5, delayMs = 1200} = {}) {
  for (let i = 0; i < maxRetries; i++) {
    for (const u of urls) {
      const ok = await probePdf(u);
      if (ok) return u;
    }
    await sleep(delayMs);
  }
  return null;
}

/* ---------- Component ---------- */
const WaybillDrawer = ({onClose, isVisible, delivery, onSignCallback}) => {
  const {t} = useTranslate();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const {signDelivery, isLoading: isLoadingSigning} = useSignDelivery();

  const [toast, setToast] = useState({visible: false, type: 'success', title: '', message: ''});
  const hideToastTimer = useRef(null);

  const showToast = (type, title, message, duration = 3500) => {
    if (hideToastTimer.current) clearTimeout(hideToastTimer.current);
    setToast({visible: true, type, title, message});
    hideToastTimer.current = setTimeout(() => setToast((prev) => ({...prev, visible: false})), duration);
  };

  const handleViewWaybill = async () => {
    setIsLoading(true);
    try {
      const userName = await getUserName();
      const userPsw  = await getUserPsw();
      const base     = await getBaseUrl();
      const ts       = Date.now();

      const candidates = buildWaybillUrls(base, delivery, userName, userPsw, ts);
      const readyUrl = await waitForPdfReady(candidates, {maxRetries: 5, delayMs: 1200});

      if (!readyUrl) {
        showToast('error',
          t('order_history_form.waybill_drawer.bill_of_lading'),
          tt(t, 'order_history_form.waybill_pdf_open.pdf_error', 'Could not open')
        );
        return;
      }

      await openFileLink(readyUrl);
      showToast('success',
        t('order_history_form.waybill_drawer.bill_of_lading'),
        tt(t, 'order_history_form.waybill_pdf_open.pdf_success', 'Opened successfully')
      );
    } catch {
      showToast('error',
        t('order_history_form.waybill_drawer.bill_of_lading'),
        tt(t, 'order_history_form.waybill_pdf_open.pdf_error', 'Could not open')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendWaybillToEmail = async () => {
    setIsLoading(true);
    try {
      const userName = await getUserName();
      const userPsw  = await getUserPsw();
      const base     = await getBaseUrl();
      const email    = await getUserEmail();

      const fullUrl =
        `${base}?mod=ecocretesmart&act=/getWayBill` +
        `&t_id=${delivery.id}&db=${delivery.db}&user=${userName}&psw=${userPsw}` +
        `&form_send=1&form_email=${encodeURIComponent(email)}&fetch_test=1`;

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {Accept: 'text/html', 'User-Agent': 'Mozilla/5.0 (ReactNative)'},
      });

      await response.text();

      if (response.ok) {
        showToast('success',
          t('order_history_form.waybill_drawer.send_to_email'),
          tt(t, 'order_history_form.waybill_send_mail.email_success', 'Email sent')
        );
      } else {
        showToast('error',
          t('order_history_form.waybill_drawer.send_to_email'),
          tt(t, 'order_history_form.waybill_send_mail.email_error', 'Email failed')
        );
      }
    } catch {
      showToast('error',
        t('order_history_form.waybill_drawer.send_to_email'),
        tt(t, 'order_history_form.waybill_send_mail.process_error', 'Process error')
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => { if (hideToastTimer.current) clearTimeout(hideToastTimer.current); };
  }, []);

  return (
    <>
      <BottomDrawerWithOverlay isVisible={isVisible} onClose={onClose}>
        <View style={[styles.container, {paddingTop: 0}]}>
          <Button
            variant="outlined"
            label={t('order_history_form.waybill_drawer.send_to_email')}
            Icon={SendSvg}
            loading={isLoading}
            onPress={handleSendWaybillToEmail}
            buttonStyle={{justifyContent: 'center', marginBottom: 10}}
            iconStyle={{marginTop: 2}}
          />

          <Button
            variant="outlined"
            label={t('order_history_form.waybill_drawer.bill_of_lading')}
            Icon={DownloadSvg}
            loading={isLoading || isLoadingSigning}
            onPress={handleViewWaybill}
            buttonStyle={{justifyContent: 'center'}}
          />

          {delivery && !delivery.signed && (
            <Button
              variant="solid"
              label={t('order_history_form.waybill_drawer.sign_up')}
              Icon={PenSvg}
              loading={isLoading || isLoadingSigning}
              onPress={() => signDelivery({id: delivery.id, db: delivery.db}, onSignCallback)}
              buttonStyle={{justifyContent: 'center', marginTop: 10}}
            />
          )}
        </View>
      </BottomDrawerWithOverlay>

      <Toast
        visible={toast.visible}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({...prev, visible: false}))}
        topOffset={Math.max(insets.top, 10) + 8}
      />
    </>
  );
};

export {WaybillDrawer};
