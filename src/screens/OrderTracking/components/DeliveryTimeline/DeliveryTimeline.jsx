import React, {useState} from 'react';
import {SectionList, View} from 'react-native';
import styles from './DeliveryTimeline.styles';
import {TimelineHeader, TimelineItem} from './components';
import {Drawer} from './components/Drawer/Drawer';

function DeliveryTimeline({timelineData, onSignCallback}) {
  const [focusdDelivery, setFocusedDelivery] = useState(null);
  return (
    <View style={styles.container}>
      <SectionList
        sections={timelineData}
        renderItem={({item}) => (
          <TimelineItem
            title={item.licensePlate}
            amount={item.amount}
            statusText={item.statusText}
            status={item.status}
            signed={item.signed}
            steps={item.steps}
            noBorder={item.noBorder}
            handleActionPress={() =>
              setFocusedDelivery({
                id: item.id,
                db: item.db,
                signed: item.signed,
              })
            }
            isGpsTracked={item.isGpsTracked}
          />
        )}
        renderSectionHeader={({section}) => (
          <TimelineHeader
            title={section.title}
            amount={section.amount}
            status={section.status}
          />
        )}
        keyExtractor={(item) => {
          return `basicListEntry-${item.id}`;
        }}
      />
      <Drawer
        isVisible={!!focusdDelivery}
        onClose={() => {
          onSignCallback();
          setFocusedDelivery(null);
        }}
        signed={focusdDelivery?.signed ?? false}
        deliveryId={focusdDelivery?.id}
        deliveryDb={focusdDelivery?.db}
      />
    </View>
  );
}

export {DeliveryTimeline};
