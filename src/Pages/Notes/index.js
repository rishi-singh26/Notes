import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Header from "../../Components/Header";
import {
  backColor,
  backColorTwo,
  lightModeTextHardColor,
  lightModeTextLightColor,
  primaryColor,
  primaryColorTwo,
} from "../../Styles/index";

const fakeDaya = [
  {
    title: "One note is here",
    isLocked: true,
    id: 1,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: false,
    id: 2,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: false,
    id: 3,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: true,
    id: 4,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: false,
    id: 5,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: true,
    id: 6,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: true,
    id: 7,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: false,
    id: 8,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: false,
    id: 9,
    desc: "Hola this is one and also very good",
  },
  {
    title: "One note is here",
    isLocked: false,
    id: 10,
    desc: "Hola this is one and also very good",
  },
];

function renderNote(item, index, props, showSelector, setShowSelector) {
  return (
    <TouchableOpacity
      onLongPress={() => {
        setShowSelector(!showSelector);
      }}
      onPress={() => {
        props.navigation.navigate("Editor", { new: false });
      }}
      style={styles.noteCard}
    >
      {showSelector ? <Text>hh</Text> : null}
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.noteHeader}>{item.title}</Text>
        <Text style={styles.noteDesc}>{item.desc}</Text>
      </View>
      {item.isLocked ? (
        <Feather name="lock" size={14} color={primaryColor} />
      ) : (
        <Text></Text>
      )}
    </TouchableOpacity>
  );
}

export default function Notes(props) {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
      <Header
        menuBtnPress={() => {
          props.navigation.toggleDrawer();
        }}
        title="Notes"
      />
      <FlatList
        style={{ backgroundColor: backColor, paddingTop: 10 }}
        data={fakeDaya}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          renderNote(item, index, props, showSelector, setShowSelector)
        }
      />
      <TouchableOpacity
        style={styles.addNoteBtnView}
        onPress={() => {
          props.navigation.navigate("Editor", { new: true });
        }}
      >
        <Feather name="plus" size={25} color={backColorTwo} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: backColorTwo,
    marginBottom: 18,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteHeader: {
    fontSize: 17,
    fontWeight: "700",
    color: lightModeTextHardColor,
  },
  noteDesc: {
    fontSize: 14,
    color: lightModeTextLightColor,
    paddingTop: 10,
  },
  addNoteBtnView: {
    backgroundColor: primaryColorTwo,
    borderRadius: 35,
    height: 62,
    width: 62,
    position: "absolute",
    zIndex: 1000,
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
