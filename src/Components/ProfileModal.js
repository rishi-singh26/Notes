import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text, Image } from "react-native";

export default function ProfileModal({ visible, closeModal }) {
  return (
    <Modal
      transparent
      animated
      animationType="slide"
      visible={visible}
      onRequestClose={() => closeModal()}
    >
      <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomColor: "#ddd",
            borderBottomWidth: 0.6,
            alignItems: "center",
          }}
        >
          <Feather
            onPress={closeModal}
            name="x"
            size={22}
            color="#000"
            style={{ paddingHorizontal: 10 }}
          />
          <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>Account</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: 10,
          }}
        >
          <Image
            source={{
              uri:
                "https://www.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png",
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginHorizontal: 23,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16 }}>Rishi Singh</Text>
            <Text style={{ fontSize: 16 }}>rishisingh@gmail.com</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
