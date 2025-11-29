import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SlumpGraphModal = ({visible, onClose, children}) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={e => e.stopPropagation()}>

          <Text style={styles.title}>Slump Graph</Text>

          {children} {/* graph burada render olacaq */}

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>

        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.9,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    maxHeight: height * 0.75,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
