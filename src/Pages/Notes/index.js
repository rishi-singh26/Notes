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
import { toggleLockNote, deleteNote } from "../../Redux/Notes/ActionCreator";
import HTML from "react-native-render-html";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Dilogue from "../../Components/Dilogue";
import * as LocalAuthentication from "expo-local-authentication";
import Constants from "expo-constants";

function renderNote(
  item,
  index,
  props,
  showActionSheet,
  dispatch,
  dilogueFuncs
) {
  return (
    <TouchableOpacity
      delayLongPress={250}
      onLongPress={() => {
        openActionSheet(showActionSheet, item.isLocked, dilogueFuncs, index);
      }}
      onPress={() => {
        item.isLocked
          ? scanFingerPrint(props, item, index, true, dispatch)
          : props.navigation.navigate("Editor", {
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

function openActionSheet(showActionSheet, isLocked, dilogueFuncs, index) {
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
          dilogueFuncs.setShowDilogue(true);
          dilogueFuncs.setDilogueLineOne("Delete note?");
          dilogueFuncs.setDilogueActionBtn("Delete");
          dilogueFuncs.setDilogueBackColor(backColorTwo);
          dilogueFuncs.setCurrentNoteIndex(index);
          break;
        case 1:
          dilogueFuncs.setShowDilogue(true);
          dilogueFuncs.setDilogueLineOne(
            isLocked ? "Unlock note?" : "Lock Note?"
          );
          dilogueFuncs.setDilogueActionBtn(isLocked ? "Unlock" : "Lock");
          dilogueFuncs.setDilogueBackColor(backColorTwo);
          dilogueFuncs.setCurrentNoteIndex(index);
          break;
      }
      // Do something here depending on the button index selected
    }
  );
}

const scanFingerPrint = async (props, item, index, mode, dispatch) => {
  try {
    let results = await LocalAuthentication.authenticateAsync();
    if (results.success) {
      mode
        ? props.navigation.navigate("Editor", {
            isNew: false,
            data: item,
            index,
          })
        : dispatch(toggleLockNote(index));
    } else {
      // console.log("Not Authenticated");
    }
  } catch (e) {
    console.log(e);
  }
};

export default function Notes(props) {
  // local state
  const [showDilogue, setShowDilogue] = useState(false);
  const [dilogueLineOne, setDilogueLineOne] = useState("");
  const [dilogueLineTwo, setDilogueLineTwo] = useState("");
  const [dilogueBackColor, setDilogueBackColor] = useState("#fff");
  const [dilogueActionBtn, setDilogueActionBtn] = useState("");
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [currentNote, setCurrentNote] = useState(null);
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
        <View style={styles.createNoteView}>
          <Text style={styles.createNote}>Create note</Text>
          <Text style={styles.createNoteTxt}>
            You have not created any notes, create one
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ backgroundColor: backColor, paddingTop: 10 }}
          data={notes.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            renderNote(
              item,
              index,
              props,
              showActionSheetWithOptions,
              dispatch,
              {
                setShowDilogue,
                setDilogueLineOne,
                setDilogueLineTwo,
                setDilogueActionBtn,
                setDilogueBackColor,
                setCurrentNoteIndex,
                setCurrentNote,
              }
            )
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
      <Dilogue
        dilogueVisible={showDilogue}
        closeDilogue={() => {
          setShowDilogue(false);
        }}
        cancellable={true}
        dilogueBackground={dilogueBackColor}
      >
        <View>
          <Text style={styles.dilogueHeader}>{dilogueLineOne}</Text>
          <Text style={styles.dilogueTxt}>{dilogueLineTwo}</Text>
          <View style={styles.dilogueBtnsView}>
            <TouchableOpacity
              onPress={() => {
                setShowDilogue(false);
              }}
            >
              <Text style={styles.dilogueBtn}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                switch (dilogueActionBtn) {
                  case "Lock":
                    dispatch(toggleLockNote(currentNoteIndex));
                    setShowDilogue(false);
                    break;

                  case "Unlock":
                    console.log("Unlocking");
                    scanFingerPrint(
                      props,
                      currentNote,
                      currentNoteIndex,
                      false,
                      dispatch
                    );
                    // dispatch(toggleLockNote(currentNoteIndex));
                    setShowDilogue(false);
                    break;

                  case "Delete":
                    dispatch(deleteNote(currentNoteIndex));
                    setShowDilogue(false);
                    break;
                }
              }}
            >
              <Text style={styles.dilogueBtn}>{dilogueActionBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dilogue>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  createNoteView: { flex: 1, justifyContent: "center", alignItems: "center" },
  createNote: {
    fontSize: 25,
    fontWeight: "700",
    color: lightModeTextLightColor,
    letterSpacing: 4,
  },
  createNoteTxt: {
    fontSize: 15,
    fontWeight: "700",
    color: lightModeTextLightColor,
  },
  dilogueHeader: { fontSize: 17, fontWeight: "700" },
  dilogueTxt: { fontSize: 14, color: lightModeTextLightColor },
  dilogueBtnsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  dilogueBtn: { fontSize: 16, fontWeight: "700", color: primaryColor },
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
