import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { backColor, backColorTwo, green } from "../../Styles";
import { useSelector, useDispatch } from "react-redux";
import RenderCategories from "./RenderCategories";
import CreateCategory from "./CreateCategory";

export default function SelectCategorie(props) {
  // redux state
  const categories = useSelector((state) => state.categories);
  // local state
  const [categoryCreatorVisible, setCategoryCreatorVisible] = useState(false);
  const [categoryName, setCategoryName] = useState(
    `Category ${categories.data.length + 1}`
  );
  // console.log("Number of categories", categories.data.length + 1);
  const [categoryColor, setCategoryColor] = useState("");
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
            size={23}
            color="#000"
            style={{ paddingRight: 10 }}
          />
          <Text style={styles.headerTitle}>Select Category</Text>
        </View>
        <RenderCategories
          data={categories.data}
          onPress={(name, id, color, index, count) => {
            props.selectCategory(name, id, color);
            props.closeCategorySelector();
            // console.log(name, "Pressed", id);
          }}
          onLongPress={() => {}}
        />
        <TouchableOpacity
          onPress={() => {
            setCategoryCreatorVisible(true);
          }}
          style={styles.createCategoryBtn}
        >
          <Feather
            name="plus"
            size={23}
            color={green}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.createCategoryTxt}>Add Category</Text>
        </TouchableOpacity>
      </View>
      <CreateCategory
        title="Add Category"
        showCategoryCreator={categoryCreatorVisible}
        cancellable={true}
        categoryCreatorBackground={backColorTwo}
        closeCategoryCreator={() => {
          setCategoryCreatorVisible(false);
        }}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        categoryColor={categoryColor}
        setCategoryColor={setCategoryColor}
        editingCategoryIndex={null}
        editingCategoryId={null}
        edit={false}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerTitle: { paddingHorizontal: 10, fontSize: 23 },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderBottomColor: "#ddd",
    // borderBottomWidth: 0.6,
    alignItems: "center",
  },
  createCategoryBtn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: backColorTwo,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  createCategoryTxt: { fontSize: 17 },
});
