import React, {useState,useContext, useEffect} from 'react';
import {ActivityIndicator,ScrollView,Text, View} from 'react-native';
import {Box} from '../../components/Box/Box';
import {CustomSwitch as Switch} from '../../components/Switch/Switch';
import {LinkButton} from '../../components/Buttons';
import {TextArea} from '../../components/Inputs';
import {
  AmountInput,
  OrderInputLayout,
  ProductSelectorSection,
  ObjectSelectorSection,
  DateInput,
  HighlightText,
  TimeInput,
  IntervalSelectorSection,
  PumpSelectorSection,
} from './components';
import {
  HousesSvg,
  LocationPinSvg,
  ClockSvg,
  CalendarSvg,
  PlusSvg,
  ProductSvg,
} from '../../assets/icons';
import styles from './OrderForm.styles';
import {NEW_ORDER_CONFIG} from './config';
import { useTranslate } from '../../hooks/useTranslate';
import {AuthContext} from '../../context/AuthProvider';
import {ButtonGroup}  from './ButtonGroup';
import {useClassData} from '../../hooks/data/useClassData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioButtonRN from 'radio-buttons-react-native';
import API from '../../api/API';

const OrderForm = ({
  formData,
  formErrors,
  valueHandlers,
  disabledFields,
  objects,
  products,
  pumps,
}) => {
  const { t} = useTranslate();
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);
  const {session} = useContext(AuthContext);
  const {classData, isLoadingClassess} = useClassData();
  const [selectedSlumpIndex, setSelectedSlumpIndex] = useState(0);
  const [selectedSlumpId, setSelectedSlumpId] = useState('');
  const [selectedStrengthIndex, setSelectedStrengthIndex] = useState(0);
  const [selectedStrengthId, setSelectedStrengthId] = useState('');
  const [strengthData, setStrengthData] = useState(()=> classData?classData[0]:[]);
  const [paymentTypeId, setPaymentTypeId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [privateProducts, setProducts] = useState(null);


  const payments = [{
    label: t('order_form.payment_bank'),
    id:1
  },
  {
    label: t('order_form.payment_invoice'),
    id:2
  }];

  const fetchProducts = async (agreement, latitude, longitude) => {
    setIsLoading(true);
    API.getProducts(agreement, latitude, longitude)
      .then((resp) => {
        setProducts(resp);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if(formData.location && session.agreement_type == 'private'){
      fetchProducts(session.agreement_type, formData.location.coordinates.latitude, formData.location.coordinates.longitude)
    }
  }, [formData.location])

  return (
    <>
    <View style={styles.mainContainer}>
    {session.agreement_type === 'private' && (
      <>
        <View>
        <Text style={styles.headerTitle}>{t('order_form.slump_class')}</Text>
                      <ScrollView horizontal={true} style={{ marginBottom: 1 }}>
                          {isLoadingClassess && <ActivityIndicator size="large" />}
                          {classData &&
                              Object.keys(classData).map((e, i) => {
                                  return (
                                      <ButtonGroup
                                          key={e}
                                          title={e}
                                          selectedIndex={selectedSlumpIndex}
                                          selectedbuttonStyle={{
                                              backgroundColor: '#FF8A00',
                                          }}
                                          isSelected={selectedSlumpIndex === i}
                                          onPress={async value => {
                                            setStrengthData(classData[e]);
                                            setSelectedSlumpIndex(i);
                                              setSelectedSlumpId(e.toString());
                                              await AsyncStorage.setItem(
                                                  'slump',
                                                  e.toString(),
                                              );
                                              await AsyncStorage.setItem(
                                                  'selectedSlumpIndex',
                                                  i.toString(),
                                              );
                                          }}
                                      />
                                  );
                              })}
                      </ScrollView>
        </View>
      </>
    )}
    {session.agreement_type === 'private' && (
      <>
      <View>
      <Text style={styles.headerTitle}>{t('order_form.strength_class')}</Text>
                    <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
                      
                        {isLoadingClassess && <ActivityIndicator size="large" />}
                        {strengthData &&
                            strengthData.map((e, i) => {
                                return (
                                    <ButtonGroup
                                        key={e.class}
                                        title={e.class}
                                        selectedIndex={selectedStrengthIndex}
                                        selectedbuttonStyle={{
                                            backgroundColor: '#FF8A00',
                                        }}
                                        isSelected={selectedStrengthIndex === i}
                                        onPress={async value => {
                                            setSelectedStrengthIndex(i);
                                            setSelectedStrengthId(e.class.toString());
                                            await AsyncStorage.setItem(
                                                'strength',
                                                e.class.toString(),
                                            );
                                            await AsyncStorage.setItem(
                                                'selectedStrengthIndex',
                                                i.toString(),
                                            );
                                        }}
                                    />
                                );
                            })}
                    </ScrollView>
      </View>
      </>
    )}
      <Box noPadding={session.agreement_type === 'contract'}>
        
        <>
        {session.agreement_type === 'contract' && (
          <>
        <OrderInputLayout
          Icon={HousesSvg}
          title={t('filter_form.object')} 
          style={styles.upperInput}
          error={formErrors.object}
        >
          <ObjectSelectorSection
            onSelect={(val) => valueHandlers.object(val)}
            items={objects ?? []}
            value={formData.object?.addressName}
            disabled={disabledFields.object}
          />
        </OrderInputLayout>
        
        <View style={styles.seperator} />
        </>
        )}

        <OrderInputLayout
          Icon={LocationPinSvg}
          title={t('order_form.place')}  
          style={styles.lowerInput}
          error={formErrors.location}
        >
          <HighlightText
            text={
              formData.location
                ? formData.location?.address ?? formData.object?.addressName
                : null
            }
            placeholder={t('filter_form.choose')}
            onPress={() => valueHandlers.location()}
            disabled={disabledFields.object}
          />
        </OrderInputLayout>
        </>

      </Box>
      <Box noPadding={true}>
        <OrderInputLayout
          title={t('new_preview_order_form.brand')}
          style={styles.upperInput}
          error={formErrors.product}
          Icon={ProductSvg}
        >
          <ProductSelectorSection
            onSelect={(val) => valueHandlers.product(val)}
            items={products ??  privateProducts ?? []}
            value={formData.product}
            disabled={disabledFields.product}
          />
        </OrderInputLayout>
        <View style={styles.seperator} />
        <OrderInputLayout
          title={t('new_preview_order_form.quantity')}
          style={styles.lowerInput}
          error={formErrors.amount}
        >
          <View>
            <AmountInput
              measurement="m3"
              value={formData.amount}
              onChange={(val) => valueHandlers.amount(val)}
              disabled={disabledFields.amount}
            />
          </View>
        </OrderInputLayout>
      </Box>
      <Box noPadding={true}>
        <OrderInputLayout
          Icon={CalendarSvg}
          title={t('new_preview_order_form.date')}
          style={styles.upperInput}
          error={formErrors.date}
        >
          <DateInput
            value={formData.date}
            onSubmit={(val) => valueHandlers.date(val)}
            disabled={disabledFields.date}
          />
        </OrderInputLayout>
        <View style={styles.seperator} />
        <OrderInputLayout
          title={t('order_form.start_of_execution')} 
          Icon={ClockSvg}
          style={styles.lowerInput}
          error={formErrors.time}
        >
          <TimeInput
            hours={formData.time.hours}
            minutes={formData.time.minutes}
            onSubmit={(hours, minutes) => valueHandlers.time(hours, minutes)}
            disabled={disabledFields.time}
          />
        </OrderInputLayout>
      </Box>
      <Box noPadding={true}>
        <OrderInputLayout
          title={t('order_form.own_transport')}
          style={styles.upperInput}
          error={formErrors.ownTransport}
        >
          <View>
            <Switch
              value={formData.ownTransport}
              onChange={(val) => valueHandlers.ownTransport(val)}
              disabled={disabledFields.ownTransport}
            />
          </View>
        </OrderInputLayout>
        <View style={styles.seperator} />
        <OrderInputLayout
          title={t('order_form.delivery_intervals')}
          error={formErrors.interval}
        >
          <IntervalSelectorSection
            items={NEW_ORDER_CONFIG.INTERVALS}
            value={formData.interval}
            onSelect={(val) => valueHandlers.interval(val)}
            disabled={false}
          />
        </OrderInputLayout>
        <View style={styles.seperator} />
        <OrderInputLayout
          title={t('order_form.why_hydraulic')}
          error={formErrors.isHydraulicChuteRequired}
        >
          <View>
            <Switch
              value={formData.isHydraulicChuteRequired}
              onChange={(val) => valueHandlers.isHydraulicChuteRequired(val)}
              disabled={disabledFields.isHydraulicChuteRequired}
            />
          </View>
        </OrderInputLayout>
        <View style={styles.seperator} />
        <OrderInputLayout
          title={t('order_form.vacuum_cleaner')}
          style={styles.lowerInput}
          error={formErrors.pump}
        >
          <PumpSelectorSection
            items={pumps ?? []}
            value={formData.pump}
            onSelect={(val) => valueHandlers.pump(val)}
            disabled={disabledFields.pump}
          />
        </OrderInputLayout>
      </Box>
      {!isCommentEnabled && !disabledFields.comment && (
        <View style={styles.commentButton}>
          <LinkButton
            title={t('order_form.add_a_comment')}
            Icon={PlusSvg}
            variant="primary"
            onPress={() => setIsCommentEnabled(true)}
          />
        </View>
      )}
      {isCommentEnabled && !disabledFields.comment && (
        <Box>
          <TextArea
            label={t('order_form.comment')}
            value={formData.comment}
            onValueChange={(val) => valueHandlers.comment(val)}
          />
        </Box>
      )}
      {session.agreement_type === 'private' && (
        <>
        <Box>
        <RadioButtonRN
        
					data={payments}
					initial={1}
					selectedBtn={(e) => setPaymentTypeId(e.id)}
					circleSize={16}
          activeColor='#2c9dd1'
				/>
        <View style={styles.seperator} />
      </Box>
        </>
      )}

    </View>
    </>
  );
};

export {OrderForm};
