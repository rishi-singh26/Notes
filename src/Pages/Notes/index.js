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
import { useSelector, useDispatch } from "react-redux";
import { toggleLockNote, deleteNote } from "../../Redux/Notes/ActionCreator";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Dilogue from "../../Components/Dilogue";
import * as LocalAuthentication from "expo-local-authentication";
import { resetSort } from "../../Redux/SortNotes/ActionCreator";
import {
  findCategoryColorAndNameUsingId,
  getDateString,
} from "../../Functions";

export default function Notes(props) {
  // redux state
  const notes = useSelector((state) => state.notes);
  const sortingData = useSelector((state) => state.sortNotes);
  const categories = useSelector((state) => state.categories);
  // local state
  const [showDilogue, setShowDilogue] = useState(false);
  const [dilogueLineOne, setDilogueLineOne] = useState("");
  const [dilogueLineTwo, setDilogueLineTwo] = useState("");
  const [dilogueBackColor, setDilogueBackColor] = useState("#fff");
  const [dilogueActionBtn, setDilogueActionBtn] = useState("");
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [currentNote, setCurrentNote] = useState(null);
  // const [sortedNotes, setSortedNotes] = useState(notes.data);

  const sortedNotes =
    sortingData._id == -11
      ? notes.data
      : notes.data.filter((item) => {
          return item.categoryId == sortingData._id;
        });

  // redux action dispatcher
  const dispatch = useDispatch();
  // actionsheet hook
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = (note, index) => {
    const options = ["Delete", note.isLocked ? "Unlock" : "Lock", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            setShowDilogue(true);
            setDilogueLineOne("Delete note?");
            setDilogueActionBtn("Delete");
            setDilogueBackColor(backColorTwo);
            setCurrentNoteIndex(index);
            setCurrentNote(note);
            break;
          case 1:
            setShowDilogue(true);
            setDilogueLineOne(note.isLocked ? "Unlock note?" : "Lock Note?");
            setDilogueActionBtn(note.isLocked ? "Unlock" : "Lock");
            setDilogueBackColor(backColorTwo);
            setCurrentNoteIndex(index);
            setCurrentNote(note);
            break;
        }
      }
    );
  };

  const renderNote = ({ item, index }) => {
    const category = findCategoryColorAndNameUsingId(
      categories,
      item.categoryId
    );

    return (
      <TouchableOpacity
        onLongPress={() => {
          openActionSheet(item, index);
        }}
        onPress={() => {
          item.isLocked
            ? scanFingerPrint(item, index, true)
            : props.navigation.navigate("Editor", {
                isNew: false,
                data: item,
                index,
                categoryId: null,
              });
          dispatch(resetSort());
        }}
        style={styles.noteCard}
      >
        <View
          style={[styles.noteCatColor, { backgroundColor: category.color }]}
        ></View>
        <View style={styles.noteCardContent}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.noteHeader}>{item.title}</Text>
            <Text style={[styles.noteDesc, { fontSize: 12 }]}>
              {new Date(getDateString(item.createdDate)).toDateString()}
            </Text>
          </View>
          {item.isLocked ? (
            <Feather name="lock" size={14} color={primaryColor} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const scanFingerPrint = async (item, index, mode) => {
    try {
      let results = await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
        fallbackLabel: "Use Pin",
      });
      if (results.success) {
        if (mode) {
          props.navigation.navigate("Editor", {
            isNew: false,
            data: item,
            index,
            categoryId: null,
          });
          dispatch(resetSort());
        } else {
          dispatch(toggleLockNote(index, false, item));
        }
      } else {
        // console.log("Not Authenticated");
      }
    } catch (e) {
      toast("Clean the scanner and try again");
      console.log("Error in scanning fingerprint", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
      {/* header */}
      <Header
        menuBtnPress={() => {
          props.navigation.toggleDrawer();
        }}
        title={sortingData.name}
        onProfilePress={() => props.navigation.navigate("Profile")}
      />
      {/* Notes */}
      {sortedNotes.length < 1 ? (
        <View style={styles.createNoteView}>
          <Text style={styles.createNote}>No Notes</Text>
          {/* <Text style={styles.createNoteTxt}>
            You have not created any notes, create one
          </Text> */}
        </View>
      ) : (
        <FlatList
          style={{ backgroundColor: backColor, paddingTop: 10 }}
          data={sortedNotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNote}
        />
      )}
      {/* FAB */}
      <TouchableOpacity
        style={styles.addNoteBtnView}
        onPress={() => {
          props.navigation.navigate("Editor", {
            isNew: true,
            data: null,
            index: null,
            categoryId: sortingData._id == -11 ? 0 : sortingData._id,
          });
          // dispatch(resetSort());
        }}
      >
        <Feather name="plus" size={25} color={backColorTwo} />
      </TouchableOpacity>
      {/* alerts */}
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
                    dispatch(
                      toggleLockNote(currentNoteIndex, true, currentNote)
                    );
                    setShowDilogue(false);
                    break;

                  case "Unlock":
                    // console.log("Unlocking");
                    scanFingerPrint(currentNote, currentNoteIndex, false);
                    // dispatch(toggleLockNote(currentNoteIndex, false, currentNote));
                    setShowDilogue(false);
                    break;

                  case "Delete":
                    dispatch(deleteNote(currentNoteIndex, currentNote));
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
  dilogueHeader: { fontSize: 17, fontWeight: "700", paddingHorizontal: 10 },
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
    flexDirection: "row",
    justifyContent: "flex-start",
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
    height: 58,
    width: 58,
    position: "absolute",
    zIndex: 1000,
    bottom: 15,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  noteCatColor: {
    width: 8,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  noteCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
});
