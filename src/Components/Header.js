import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuIcon from "./MenuIcon";
import {
  backColor,
  backColorTwo,
  lightModeTextHardColor,
  lightModeTextLightColor,
  primaryColor,
} from "../Styles/index";
import ProfileModal from "./ProfileModal";

export default function Header({ menuBtnPress, title }) {
  const [accountModalVisible, setAccountModalVisible] = useState(false);

  return (
    <View style={styles.headerBox}>
      <View style={styles.headerMenuView}>
        <View style={{ flexDirection: "column" }}>
          <MenuIcon
            onPress={() => {
              menuBtnPress();
            }}
            iconColor={lightModeTextHardColor}
          />
          <Text style={styles.headerHeading}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setAccountModalVisible(true);
          }}
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={30}
            color={backColorTwo}
            style={styles.headerBoxIcon}
          />
        </TouchableOpacity>
      </View>
      <ProfileModal
        visible={accountModalVisible}
        closeModal={() => {
          setAccountModalVisible(!accountModalVisible);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: backColor,
  },

  headerMenuView: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingBottom: 10,
    paddingTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerHeading: {
    color: lightModeTextHardColor,
    paddingTop: 25,
    fontSize: 32,
    fontWeight: "700",
  },

  headerBoxIcon: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: primaryColor,
    borderRadius: 30,
  },
});
