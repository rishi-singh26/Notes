import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, Pressable } from "react-native";
import { categoryColors } from "../../Assets/CategoryColors";
import { backColorTwo } from "../../Styles";

export default function RenderCategoryColors({ onColorChange }) {
  // const [selectedCategoryColor, setSelectedCategoryColor] = useState(
  //   Math.floor(Math.random() * 11 + 1)
  // );
  const [selectedCategoryColor, setSelectedCategoryColor] = useState(-1);

  return (
    <FlatList
      data={categoryColors}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onColorChange(item.color);
              setSelectedCategoryColor(index);
            }}
            style={{
              backgroundColor: item.color,
              marginVertical: 10,
              marginHorizontal: 12,
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedCategoryColor === index ? (
              <Feather name="check" color={backColorTwo} size={20} />
            ) : null}
          </Pressable>
        );
      }}
      numColumns={6}
    />
  );
}
