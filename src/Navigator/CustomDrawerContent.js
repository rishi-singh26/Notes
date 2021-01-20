import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  backColor,
  lightModeBtnBackColor,
  lightModeTextLightColor,
  primaryColor,
} from "../Styles";
import { useSelector, useDispatch } from "react-redux";
import Dot from "../Components/Dot";
import { resetSort, sortNote } from "../Redux/SortNotes/ActionCreator";

export default function CustomDrawerContent(props) {
  // global state
  const categories = useSelector((state) => state.categories);
  const notes = useSelector((state) => state.notes);
  const sortNotes = useSelector((state) => state.sortNotes);
  // local state
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [showUncategorisedBtn, setShowUncategorisedBtn] = useState(false);
  // action dispatcher
  const dispatch = useDispatch();

  useEffect(() => {
    notes.data.map((item, index) => {
      if (item.categoryId === 0) {
        setShowUncategorisedBtn(true);
      }
    });
  }, [notes]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backColor,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        // style={{ marginRight: 10, paddingRight: 10 }}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={styles.settingsView}>
                <Feather name="settings" size={20} />
              </View>
              <TouchableNativeFeedback
                onPress={() => {
                  setSelectedCategory(-1);
                  dispatch(resetSort());
                  props.navigation.toggleDrawer();
                }}
              >
                <View style={styles.touchableView}>
                  <Feather
                    name="file-text"
                    size={20}
                    style={{ marginHorizontal: 15 }}
                    color="#000"
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: sortNotes._id === -11 ? "700" : "600",
                      color: sortNotes._id === -11 ? primaryColor : "#000",
                    }}
                  >
                    All Notes
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </>
          );
        }}
        ListFooterComponent={() => {
          return (
            <>
              {showUncategorisedBtn ? (
                <TouchableNativeFeedback
                  onPress={() => {
                    setSelectedCategory(-2);
                    dispatch(sortNote(0, "Uncategorised"));
                    props.navigation.toggleDrawer();
                  }}
                >
                  <View style={styles.touchableView}>
                    <Dot
                      color={"#888"}
                      size={10}
                      style={{ marginHorizontal: 20 }}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: selectedCategory === -2 ? "700" : "600",
                        color: selectedCategory === -2 ? primaryColor : "#000",
                      }}
                    >
                      Uncategorised
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ) : null}
              <TouchableNativeFeedback
                onPress={() => {
                  setSelectedCategory(-1);
                  dispatch(resetSort());
                  props.navigation.navigate("ManageCategories");
                }}
              >
                <View style={styles.manageCategoriesView}>
                  <Feather
                    name="sliders"
                    size={20}
                    style={{ marginHorizontal: 15 }}
                    color="#000"
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      // fontWeight: selectedCategory === -1 ? "700" : "600",
                      color: "#000",
                    }}
                  >
                    Manage Categories
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </>
          );
        }}
        data={categories.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableNativeFeedback
              onPress={() => {
                setSelectedCategory(index);
                dispatch(sortNote(item._id, item.name));
                props.navigation.toggleDrawer();
              }}
            >
              <View style={styles.touchableView}>
                <Dot
                  color={item.color}
                  size={10}
                  style={{ marginHorizontal: 20 }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: sortNotes._id === item._id ? "700" : "600",
                    color: sortNotes._id === item._id ? primaryColor : "#000",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableNativeFeedback>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  touchableView: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: lightModeBtnBackColor,
    flexDirection: "row",
    alignItems: "center",
  },
  settingsView: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
  manageCategoriesView: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: lightModeBtnBackColor,
    flexDirection: "row",
    alignItems: "center",
  },
});
