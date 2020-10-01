import React, { useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {
  backColor,
  backColorTwo,
  green,
  lightModeBtnBackColor,
  lightModeTextLightColor,
} from "../../Styles";
import Dot from "../../Components/Dot";
import { Feather } from "@expo/vector-icons";
import CreateCategory from "./CreateCategory";

export default function RenderCategories({ data, onPress, onLongPress }) {
  const [categoryCreatorVisible, setCategoryCreatorVisible] = useState(false);

  return (
    <View>
      <FlatList
        style={{ marginTop: 10 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={[
                {
                  borderTopLeftRadius: index === 0 ? 20 : 0,
                  borderTopRightRadius: index === 0 ? 20 : 0,
                  borderBottomLeftRadius: index === data.length - 1 ? 20 : 0,
                  borderBottomRightRadius: index === data.length - 1 ? 20 : 0,
                },
                styles.category,
              ]}
              onPress={() => {
                onPress(item.name, item.id, item.color);
              }}
              onLongPress={() => {
                onLongPress();
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Dot
                  color={item.color}
                  size={8}
                  style={{ marginHorizontal: 10 }}
                />
                <Text style={{ fontSize: 17 }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
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
      <CreateCategory
        showCategoryCreator={categoryCreatorVisible}
        cancellable={true}
        categoryCreatorBackground={backColorTwo}
        closeCategoryCreator={() => {
          setCategoryCreatorVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: backColorTwo,
    // borderBottomColor: lightModeBtnBackColor,
    // borderBottomWidth: 0.2,
    marginTop: 1,
  },
  createCategoryBtn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: backColorTwo,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  createCategoryTxt: { fontSize: 17 },
});
