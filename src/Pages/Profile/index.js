import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileModal({ visible, closeModal }) {
  const auth = useSelector((state) => state.auth);
  return (
    <Modal
      transparent
      animated
      animationType="slide"
      visible={visible}
      onRequestClose={() => closeModal()}
    >
      <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>
            <Feather
              onPress={closeModal}
              name="x"
              size={22}
              color="#000"
              style={{ paddingHorizontal: 10 }}
            />
            <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>Account</Text>
          </View>
          <Feather
            name="settings"
            size={22}
            style={{ paddingHorizontal: 10 }}
          />
        </View>
        <Text>{JSON.stringify(auth, null, 4)}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.6,
    alignItems: "center",
  },
  headerLeftView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
