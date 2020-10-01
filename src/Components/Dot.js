import React from "react";
import { View } from "react-native";

export default function Dot({ color, size, style }) {
  return (
    <View
      style={[
        {
          height: size,
          width: size,
          borderRadius: size,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}
