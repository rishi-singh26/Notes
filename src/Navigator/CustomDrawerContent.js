import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
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
import { sortNote } from "../Redux/SortNotes/ActionCreator";

export default function CustomDrawerContent(props) {
  // global state
  const categories = useSelector((state) => state.categories);
  // local state
  const [selectedCategory, setSelectedCategory] = useState(-1);

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
      <TouchableNativeFeedback
        onPress={() => {
          setSelectedCategory(-1);
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
              fontWeight: selectedCategory === -1 ? "700" : "600",
              color: selectedCategory === -1 ? primaryColor : "#000",
            }}
          >
            All Notes
          </Text>
        </View>
      </TouchableNativeFeedback>
      <FlatList
        data={categories.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableNativeFeedback
              onPress={() => {
                setSelectedCategory(index);
                sortNote(item.id, item.name);
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
                    fontWeight: selectedCategory === index ? "700" : "600",
                    color: selectedCategory === index ? primaryColor : "#000",
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
    marginVertical: 5,
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
});
