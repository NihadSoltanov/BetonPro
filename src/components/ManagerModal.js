import React from "react";
import { Modal, View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";

export default function ManagerModal({ visible, onClose, name, phone }) {

  const makeCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.callBtn} onPress={makeCall}>
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: "#555",
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  callBtn: {
    flex: 1,
    backgroundColor: "#0A84FF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#cccccc",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  callText: { color: "#fff", fontWeight: "600" },
  cancelText: { color: "#000", fontWeight: "600" },
});
