import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { backColor, backColorTwo, green } from "../../Styles";
import { useSelector, useDispatch } from "react-redux";
import RenderCategories from "./RenderCategories";
import CreateCategory from "./CreateCategory";
import {
  startDrawerSwipe,
  stopDrawerSwipe,
} from "../../Redux/DrawerSwipe/ActionCreator";
import { deleteCategory } from "../../Redux/Categories/ActionCreator";
import { useActionSheet } from "@expo/react-native-action-sheet";

function openActionSheet(
  showActionSheetWithOptions,
  dispatch,
  editingCategoryIndex
) {
  // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html

  const options = ["Delete", "Cancel"];
  const destructiveButtonIndex = 0;
  const cancelButtonIndex = 1;

  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        dispatch(deleteCategory(editingCategoryIndex));
      }
      // Do something here depending on the button index selected
    }
  );
}

export default function ManageCategories(props) {
  // redux state
  const categories = useSelector((state) => state.categories);
  // local state
  const [categoryCreatorVisible, setCategoryCreatorVisible] = useState(false);
  const [categoryName, setCategoryName] = useState(
    `Category ${categories.data.length + 1}`
  );
  const [categoryColor, setCategoryColor] = useState("");
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(-1);
  const [editingCategoryId, setEditingCategoryId] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  // redux action dispatcher
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    dispatch(stopDrawerSwipe());
    // returned function will be called on component unmount
    return () => {
      dispatch(startDrawerSwipe());
    };
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: backColor }}
      >
        <View style={styles.header}>
          <Feather
            onPress={() => {
              props.navigation.goBack();
            }}
            name="chevron-left"
            size={25}
            color="#000"
            style={{ paddingRight: 10 }}
          />
          <Text style={styles.headerTitle}>Manage Categories</Text>
        </View>
        <View>
          <RenderCategories
            data={categories.data}
            onPress={(name, id, color, index, count) => {
              setCategoryCreatorVisible(true);
              setEditingCategoryIndex(index);
              setCategoryName(name);
              setCategoryColor(color);
              setEditingCategoryId(id);
              setIsEditing(true);
              // console.log(name, "Pressed", id);
            }}
            onLongPress={(name, id, color, index, count) => {
              openActionSheet(
                showActionSheetWithOptions,
                dispatch,
                editingCategoryIndex
              );
              setEditingCategoryIndex(index);
              setCategoryName(name);
              setCategoryColor(color);
              setEditingCategoryId(id);
              setIsEditing(true);
              // console.log(name, "Long Pressed", id);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setCategoryCreatorVisible(true);
            setEditingCategoryIndex(-1);
            setCategoryName(`Category ${categories.data.length + 1}`);
            setCategoryColor("");
            setEditingCategoryId(-1);
            setIsEditing(false);
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
        title={isEditing ? "Edit Category" : "Add Category"}
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
        editingCategoryIndex={editingCategoryIndex}
        editingCategoryId={editingCategoryId}
        edit={isEditing}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: { paddingHorizontal: 10, fontSize: 25 },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
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
