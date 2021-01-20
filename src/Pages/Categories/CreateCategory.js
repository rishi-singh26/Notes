import React, { useState } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Dilogue from "../../Components/Dilogue";
import { lightModeTextLightColor, primaryColor } from "../../Styles";
import RenderCategoryColors from "./RenderCategoryColors";
import {
  createCategory,
  editCategory,
} from "../../Redux/Categories/ActionCreator";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "../../Functions/index";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function CreateCategory({
  title,
  showCategoryCreator,
  cancellable,
  closeCategoryCreator,
  categoryCreatorBackground,
  categoryName,
  setCategoryName,
  categoryColor,
  setCategoryColor,
  editingCategoryIndex,
  editingCategoryId,
  edit,
}) {
  //   global state
  const categories = useSelector((state) => state.categories);
  // redux action dispatcher
  const dispatch = useDispatch();

  return (
    <Dilogue
      dilogueVisible={showCategoryCreator}
      cancellable={cancellable}
      closeDilogue={closeCategoryCreator}
      dilogueBackground={categoryCreatorBackground}
    >
      <Text style={{ fontSize: 18, fontWeight: "700", paddingHorizontal: 10 }}>
        {title}
      </Text>
      <TextInput
        selectTextOnFocus={true}
        value={categoryName}
        onChangeText={(text) => {
          setCategoryName(text);
        }}
        style={styles.categoryNameInput}
        placeholder="Category name"
        placeholderTextColor={lightModeTextLightColor}
      />
      <Text style={styles.colorTxt}>Colors</Text>
      <View style={styles.categoryColorsSelectorView}>
        <RenderCategoryColors
          onColorChange={(color) => {
            // console.log("Color changed", color);
            setCategoryColor(color);
          }}
        />
      </View>
      <View style={styles.dilogueBtnsView}>
        <TouchableOpacity
          onPress={() => {
            closeCategoryCreator();
          }}
        >
          <Text style={styles.dilogueBtn}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (categoryName != "" && categoryColor != "") {
              edit
                ? dispatch(
                    editCategory(
                      {
                        name: categoryName,
                        _id: editingCategoryId,
                        color: categoryColor,
                        count: 0,
                      },
                      editingCategoryIndex
                    )
                  )
                : dispatch(
                    createCategory({
                      name: categoryName,
                      _id: uuidv4(),
                      color: categoryColor,
                      count: 0,
                    })
                  );
              closeCategoryCreator();
            } else {
              toast("Enter category and select category color");
            }
          }}
        >
          <Text style={styles.dilogueBtn}>Done</Text>
        </TouchableOpacity>
      </View>
    </Dilogue>
  );
}

const styles = StyleSheet.create({
  dilogueBtnsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  dilogueBtn: { fontSize: 16, fontWeight: "700", color: primaryColor },
  categoryNameInput: {
    borderBottomColor: primaryColor,
    borderBottomWidth: 0.6,
    marginHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 5,
    fontSize: 16,
  },
  colorTxt: {
    fontSize: 15,
    fontWeight: "700",
    color: lightModeTextLightColor,
    paddingHorizontal: 10,
  },
  categoryColorsSelectorView: { padding: 10 },
});
