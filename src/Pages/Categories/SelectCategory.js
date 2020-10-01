import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { backColor, backColorTwo, green } from "../../Styles";
import { useSelector, useDispatch } from "react-redux";
import RenderCategories from "./RenderCategories";

export default function SelectCategorie(props) {
  // redux state
  const categories = useSelector((state) => state.categories);
  // redux action dispatcher
  const dispatch = useDispatch();

  return (
    <Modal
      transparent
      animationType={"slide"}
      visible={props.categoriesSelectorVisible}
      onRequestClose={() => {
        props.closeCategorySelector();
      }}
    >
      <View
        style={{ height: "100%", width: "100%", backgroundColor: backColor }}
      >
        <View style={styles.header}>
          <Feather
            onPress={props.closeCategorySelector}
            name="x"
            size={22}
            color="#000"
            style={{ paddingHorizontal: 10 }}
          />
          <Text style={styles.headerTitle}>Select Category</Text>
        </View>
        <RenderCategories
          data={categories.data}
          onPress={(name, id, color) => {
            props.selectCategory(name, id, color);
            props.closeCategorySelector();
            console.log(name, "Pressed", id);
          }}
          onLongPress={() => {}}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerTitle: { paddingHorizontal: 20, fontSize: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderBottomColor: "#ddd",
    // borderBottomWidth: 0.6,
    alignItems: "center",
  },
});
