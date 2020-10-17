import { Feather } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Modal, View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { backColor, SCREEN_WIDTH } from "../../Styles";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import ResetPassword from "../Auth/ResetPassword";

function scrollAuthPage(scrollRef, scrollValue) {
  scrollRef.current.scrollTo({
    animated: true,
    y: 0,
    x: scrollValue,
    duration: 1000,
  });
}

export default function ProfileModal({ visible, closeModal }) {
  const scrollRef = useRef();

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
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={{ flex: 1, backgroundColor: backColor }}
        >
          <View style={{ width: SCREEN_WIDTH }}>
            <Login
              onSignupPress={() => {
                scrollAuthPage(scrollRef, SCREEN_WIDTH);
              }}
              onForgotPassPress={() => {
                scrollAuthPage(scrollRef, SCREEN_WIDTH * 2);
              }}
            />
          </View>
          <View style={{ width: SCREEN_WIDTH }}>
            <Signup
              onLoginPress={() => {
                scrollAuthPage(scrollRef, 0);
              }}
            />
          </View>
          <View style={{ width: SCREEN_WIDTH }}>
            <ResetPassword
              onBackPress={() => {
                scrollAuthPage(scrollRef, 0);
              }}
            />
          </View>
        </ScrollView>
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
