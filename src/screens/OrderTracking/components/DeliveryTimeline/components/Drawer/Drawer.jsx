// OrderTracking/components/DeliveryTimeline/Drawer.jsx  (örnek yol)
import React, {useState, useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './Drawer.styles';
import {BottomDrawerWithOverlay, Button} from '../../../../../../components';
import {DownloadSvg} from '../../../../../../assets/icons';
import {getBaseUrl, getUserName, getUserPsw} from '../../../../../../util/TokenUtil';
import {openFileLink} from '../../../../../../util/FileSystemUtils';
import {useSignDelivery} from '../../../../../../hooks/data';
import {useTranslate} from '../../../../../../hooks/useTranslate';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
      if (await probePdf(u)) return u;
    }
    await sleep(delayMs);
  }
  return null;
}

const Drawer = ({onClose, isVisible, deliveryId, deliveryDb, signed}) => {
  const {t} = useTranslate();
  const {signDelivery, isLoading: isLoadingSigning} = useSignDelivery();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewWaybill = async () => {
    setIsLoading(true);
    try {
      const userName = await getUserName();
      const userPsw  = await getUserPsw();
      const base     = await getBaseUrl();
      const ts       = Date.now();

      const delivery = {id: deliveryId, db: deliveryDb};
      const candidates = buildWaybillUrls(base, delivery, userName, userPsw, ts);

      const readyUrl = await waitForPdfReady(candidates, {maxRetries: 5, delayMs: 1200});
      if (!readyUrl) {
        setIsLoading(false);
        return;
      }

      await openFileLink(readyUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomDrawerWithOverlay isVisible={isVisible} onClose={onClose}>
      {signed && <Text style={styles.signedHeader}>Pasirašyta</Text>}
      <View style={styles.container}>
        <Button
          variant="outlined"
          label={t('order_tracking_form.delivery_timeline_drawer.bill_of_lading')}
          Icon={DownloadSvg}
          loading={isLoading || isLoadingSigning}
          onPress={handleViewWaybill}
          buttonStyle={{justifyContent: 'center'}}
        />
        {!signed && (
          <Button
            variant="solid"
            label={t('order_tracking_form.delivery_timeline_drawer.sign_up')}
            Icon={DownloadSvg}
            loading={isLoading || isLoadingSigning}
            onPress={() => signDelivery({id: deliveryId, db: deliveryDb}, onClose)}
            buttonStyle={{justifyContent: 'center', marginTop: 10}}
          />
        )}
      </View>
    </BottomDrawerWithOverlay>
  );
};

export {Drawer};
