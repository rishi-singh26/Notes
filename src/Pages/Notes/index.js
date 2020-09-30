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
  SCREEN_WIDTH,
} from "../../Styles/index";
import { useSelector, useDispatch } from "react-redux";
import {
  createNote,
  editNote,
  deleteNote,
} from "../../Redux/Notes/ActionCreator";
import HTML from "react-native-render-html";
import { useActionSheet } from "@expo/react-native-action-sheet";

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

function renderNote(item, index, props, showActionSheet, dispatch) {
  return (
    <TouchableOpacity
      onLongPress={() => {
        openActionSheet(showActionSheet, index, dispatch, item.isLocked);
      }}
      onPress={() => {
        props.navigation.navigate("Editor", {
          isNew: false,
          data: item,
          index,
        });
      }}
      style={styles.noteCard}
    >
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.noteHeader}>{item.title}</Text>
        {/* <HTML
          html={item.content}
          imagesMaxWidth={SCREEN_WIDTH - 100}
          baseFontStyle={{ fontSize: 16, color: lightModeTextLightColor }}
          containerStyle={{ paddingTop: 15 }}
        /> */}
        {/* <Text style={styles.noteDesc}>{item.desc}</Text> */}
        <Text style={[styles.noteDesc, { fontSize: 12 }]}>
          {item.createdDate}
        </Text>
      </View>
      {item.isLocked ? (
        <Feather name="lock" size={14} color={primaryColor} />
      ) : (
        <Text> </Text>
      )}
    </TouchableOpacity>
  );
}

function openActionSheet(showActionSheet, index, dispatch, isLocked) {
  // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html

  const options = ["Delete", isLocked ? "Unlock" : "Lock", "Cancel"];
  const destructiveButtonIndex = 0;
  const cancelButtonIndex = 2;

  showActionSheet(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          dispatch(deleteNote(index));
          break;
        case 1:
          console.log("Locking this note");
          break;
      }
      // Do something here depending on the button index selected
    }
  );
}

export default function Notes(props) {
  // local state
  const [showSelector, setShowSelector] = useState(false);
  // redux state
  const notes = useSelector((state) => state.notes);
  // redux action dispatcher
  const dispatch = useDispatch();
  // actionsheet hook
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
      <Header
        menuBtnPress={() => {
          props.navigation.toggleDrawer();
        }}
        title="Notes"
      />
      {notes.data.length < 1 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
              color: lightModeTextLightColor,
              letterSpacing: 4,
            }}
          >
            Create note
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: lightModeTextLightColor,
            }}
          >
            You have not created any notes, create one
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ backgroundColor: backColor, paddingTop: 10 }}
          data={notes.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            renderNote(item, index, props, showActionSheetWithOptions, dispatch)
          }
        />
      )}
      <TouchableOpacity
        style={styles.addNoteBtnView}
        onPress={() => {
          props.navigation.navigate("Editor", {
            isNew: true,
            data: null,
            index: null,
          });
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
