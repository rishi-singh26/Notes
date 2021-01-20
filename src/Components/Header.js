import React from "react";
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

export default function Header({ menuBtnPress, title, onProfilePress }) {
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
            onProfilePress();
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
    paddingTop: 15,
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
