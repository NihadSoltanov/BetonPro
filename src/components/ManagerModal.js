import React from "react";
import { useTranslate } from "../hooks/useTranslate";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

export default function ManagerModal({ visible, onClose, name, phone }) {
  const { t } = useTranslate();

  const makeCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
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
              <Text style={styles.callText}>
                {t("manager_modal.call")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>

              <Text style={styles.cancelText}>
                {t("manager_modal.cancel")}
              </Text>
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
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "82%",
    backgroundColor: "#fff",
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 26,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  callBtn: {
    flex: 1,
    backgroundColor: "#0A84FF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8,
  },
  callText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
    borderWidth: 1.5,
    borderColor: "#E53935",
  },
  cancelText: {
    color: "#E53935",
    fontWeight: "700",
    fontSize: 15,
  },
});
