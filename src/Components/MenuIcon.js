import React from "react";
import { View, TouchableOpacity } from "react-native";

export default function MenuIcon({ onPress, iconColor }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "column", paddingVertical: 10 }}
      onPress={() => {
        onPress();
      }}
    >
      <View
        style={{
          height: 3,
          width: 30,
          borderRadius: 50,
          backgroundColor: iconColor,
          marginVertical: 3,
        }}
      ></View>
      <View
        style={{
          height: 3,
          width: 23,
          borderRadius: 50,
          backgroundColor: iconColor,
          marginVertical: 3,
        }}
      ></View>
    </TouchableOpacity>
  );
}
