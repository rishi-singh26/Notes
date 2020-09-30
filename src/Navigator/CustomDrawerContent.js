import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import {
  backColor,
  lightModeBtnBackColor,
  lightModeTextLightColor,
} from "../Styles";

export default function CustomDrawerContent() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backColor,
      }}
    >
      <View style={styles.settingsView}>
        <Feather name="settings" size={20} />
      </View>
      <TouchableNativeFeedback>
        <View style={styles.touchableView}>
          <Feather
            name="file-text"
            size={20}
            style={{ paddingHorizontal: 10 }}
          />
          <Text style={{ fontWeight: "700" }}>All Notes</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableView: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
    backgroundColor: lightModeBtnBackColor,
    flexDirection: "row",
  },
  settingsView: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
});
