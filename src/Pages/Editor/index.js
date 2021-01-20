import React from "react";
import {
  Appearance,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { Assets } from "../../Assets";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import {
  backColor,
  backColorTwo,
  lightModeTextHardColor,
  lightModeTextLightColor,
  primaryErrColor,
} from "../../Styles";
import {
  createNote,
  editNote,
  deleteNote,
} from "../../Redux/Notes/ActionCreator";
import {
  startDrawerSwipe,
  stopDrawerSwipe,
} from "../../Redux/DrawerSwipe/ActionCreator";
import { connect } from "react-redux";
import SelectCategorie from "../Categories/SelectCategory";
import { findCategoryColorAndNameUsingId, toast } from "../../Functions/index";
import Dilogue from "../../Components/Dilogue";
import InsertLink from "./InsertLink";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { connectActionSheet } from "@expo/react-native-action-sheet";

const { strikeThrough, video, html, emoji } = Assets;

const newNoteId = uuidv4();

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createNote: (note) => dispatch(createNote(note)),
  editNote: (note, index) => dispatch(editNote(note, index)),
  startDrawerSwipe: () => dispatch(startDrawerSwipe()),
  stopDrawerSwipe: () => dispatch(stopDrawerSwipe()),
  deleteNote: (index, note) => dispatch(deleteNote(index, note)),
});

class Editor extends React.Component {
  richText = React.createRef();
  linkModal = React.createRef();

  constructor(props) {
    super(props);
    const { isNew, data, index, categoryId } = this.props.route.params;
    let title = ``;
    let initialHTML = ``;
    let catId = 0;
    let catName = "";
    let categoryColor = "";
    if (isNew) {
      const catData = findCategoryColorAndNameUsingId(
        props.categories,
        categoryId
      );
      catId = categoryId;
      catName = catData.name;
      categoryColor = catData.color;
    } else {
      const catData = findCategoryColorAndNameUsingId(
        props.categories,
        data.categoryId
      );
      title = data.title;
      initialHTML = data.content;
      catId = data.categoryId;
      catName = catData.name;
      categoryColor = catData.color;
    }
    // console.log(Appearance.getColorScheme());
    const theme = "light";
    const contentStyle = this.createContentStyle(theme);
    this.initHTML = initialHTML;
    this.state = {
      theme,
      contentStyle,
      title,
      categoryName: catName,
      categoryId: catId,
      categoryColor,
      emojiVisible: false,
      changeMade: false,
      image: null,
      selectCategoryModalVisible: false,
      showDiscardChangesDilogue: false,
      currentNavAction: null,
      showInsertLinkDilogue: false,
      linkTitle: "",
      linkData: "https://",
    };
  }

  componentDidMount() {
    Appearance.addChangeListener(this.themeChange);
    Keyboard.addListener("keyboardDidShow", this.onKeyBoard);
    // stop drawer swipe
    this.props.stopDrawerSwipe();

    this.props.navigation.addListener("beforeRemove", (e) => {
      if (!this.state.changeMade) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      this.setState({
        showDiscardChangesDilogue: true,
        currentNavAction: e.data.action,
      });
    });
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener("keyboardDidShow", this.onKeyBoard);
    // start drawer swipe
    this.props.startDrawerSwipe();
    this.props.navigation.removeListener("beforeRemove");
  }

  onKeyBoard = () => {
    // TextInput.State.currentlyFocusedField() &&
    this.setState({ emojiVisible: false });
  };

  getPermission = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        this.pickImage();
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
      // exif: true,
    });

    result.cancelled
      ? null
      : this.richText.current?.insertImage(
          `data:${result.type}/*;base64,${result.base64}`
        );

    // this.richText.current?.insertVideo(
    //   "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    // );
  };

  handleChange = (html) => {
    const { isNew, data, index } = this.props.route.params;
    this.setState({ changeMade: isNew ? true : html != data.content });
  };

  handleHeightChange = (height) => {
    // console.log("editor height change:", height);
  };

  handleEmoji = () => {
    const { emojiVisible } = this.state;
    Keyboard.dismiss();
    this.richText.current?.blurContentEditor();
    this.setState({ emojiVisible: !emojiVisible });
  };

  insertHTML = () => {
    this.richText.current?.insertHTML(
      `<span style="color: blue; padding:0 10px;">HTML</span>`
    );
  };

  onLinkDone = (title, url) => {
    console.log({ title, url });
    this.richText.current?.insertLink(title, url);
  };

  onInsertLink = () => {
    this.setState({ showInsertLinkDilogue: true });
  };

  save = async () => {
    const { isNew, data, index, categoryId } = this.props.route.params;

    // Get the data here and call the interface to save the data
    let html = await this.richText.current?.getContentHtml();

    if (isNew && html == "" && this.state.title == "") {
      toast("Nothing to save!");
      return;
    }

    const note = {
      title: this.state.title,
      content: html,
      desc: "",
      createdDate: isNew ? new Date() : data.createdDate,
      isLocked: isNew ? false : data.isLocked,
      categoryId: this.state.categoryId,
      updatedDate: isNew ? null : new Date(),
      _id: isNew ? newNoteId : data._id,
    };

    // const date = new Date(item.updateDate.seconds * 1000).toDateString();
    isNew ? this.props.createNote(note) : this.props.editNote(note, index);
    this.setState({ changeMade: false });
    // console.log(note);
  };

  createContentStyle = (theme) => {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
      backgroundColor: "#000033",
      color: "#fff",
      placeholderColor: "gray",
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: "font-size: 16px; min-height: 200px; height: 100%;", // initial valid
    };
    if (theme === "light") {
      contentStyle.backgroundColor = backColor;
      contentStyle.color = lightModeTextHardColor;
      contentStyle.placeholderColor = "#a9a9a9";
    }
    return contentStyle;
  };

  editorInitializedCallback = () => {
    this.richText.current?.registerToolbar(function (items) {
      //   console.log(
      //     "Toolbar click, selected items (insert end callback):",
      //     items
      //   );
    });
  };

  openOptionsSheet = () => {
    const options = ["Delete", "Share", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;
    const textStyle = { fontWeight: "700" };
    const { data, index } = this.props.route.params;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.deleteNote(index, data);
          this.props.navigation.goBack();
          return;
        }
        if (buttonIndex === 1) {
          console.log("Sharing");
          return;
        }
        // Do something here depending on the button index selected
      }
    );
  };

  render() {
    const {
      contentStyle,
      theme,
      title,
      changeMade,
      categoryName,
      categoryId,
      categoryColor,
      selectCategoryModalVisible,
      showDiscardChangesDilogue,
      currentNavAction,
      showInsertLinkDilogue,
      linkTitle,
      linkData,
    } = this.state;
    const { isNew, data, index } = this.props.route.params;
    const { backgroundColor, color, placeholderColor } = contentStyle;
    const themeBg = { backgroundColor };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
        <InsertLink
          showDilogue={showInsertLinkDilogue}
          closeDilogue={() => {
            this.setState({ showInsertLinkDilogue: false });
          }}
          linkTitle={linkTitle}
          setTitleChange={(text) => {
            this.setState({ linkTitle: text });
          }}
          linkData={linkData}
          setDataChange={(text) => {
            this.setState({ linkData: text });
          }}
          submitLink={(title, link) => {
            this.onLinkDone(title, link);
          }}
        />
        <View style={styles.topBtnsView}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Feather size={25} color="#888" name="chevron-left" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => {
                changeMade ? this.save() : toast("Saved");
              }}
            >
              <Text style={styles.topBtnTxt}>
                {changeMade ? "Save" : "Saved"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => {
                this.openOptionsSheet();
              }}
            >
              <Feather size={20} color="#333" name="more-vertical" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView keyboardDismissMode={"none"}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selectCategoryModalVisible: true });
            }}
            style={[
              styles.categoryView,
              {
                borderColor: categoryId
                  ? categoryColor
                  : lightModeTextLightColor,
              },
            ]}
          >
            <Text
              style={[
                styles.categoryTxt,
                {
                  color: categoryId ? categoryColor : lightModeTextLightColor,
                },
              ]}
            >
              {categoryName}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.titleInput}
            editable={true}
            placeholderTextColor={placeholderColor}
            placeholder={"Title"}
            value={title}
            onChangeText={(text) => {
              this.setState({
                title: text,
                changeMade: isNew ? true : data.title != text,
              });
            }}
          />
          <RichEditor
            initialFocus={false}
            disabled={false}
            editorStyle={contentStyle} // default light style
            containerStyle={themeBg}
            ref={this.richText}
            style={[{ minHeight: 300, flex: 1 }, themeBg]}
            placeholder={"Note"}
            initialContentHTML={this.initHTML}
            editorInitializedCallback={this.editorInitializedCallback}
            onChange={this.handleChange}
            onHeightChange={this.handleHeightChange}
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ borderTopColor: "#eee", borderTopWidth: 0.5 }}
        >
          <RichToolbar
            style={[
              {
                height: 50,
                backgroundColor: "#F5FCFF",
              },
              themeBg,
            ]}
            editor={this.richText}
            disabled={false}
            iconTint={color}
            selectedIconTint={"#2095F2"}
            disabledIconTint={"#8b8b8b"}
            onPressAddImage={() => this.getPermission(true)}
            onInsertLink={this.onInsertLink}
            iconSize={45} // default 50
            actions={[
              // "insertVideo",
              ...defaultActions,
              actions.setStrikethrough,
              actions.heading1,
              actions.heading3,
              actions.heading4,
              // "insertHTML",
            ]} // default defaultActions
            iconMap={{
              [actions.setStrikethrough]: strikeThrough,
              [actions.heading1]: ({ tintColor }) => (
                <Text
                  style={[styles.h1Text, { color: tintColor, fontSize: 22 }]}
                >
                  H1
                </Text>
              ),
              [actions.heading3]: ({ tintColor }) => (
                <Text
                  style={[styles.h1Text, { color: tintColor, fontSize: 16 }]}
                >
                  H2
                </Text>
              ),
              [actions.heading4]: ({ tintColor }) => (
                <Text
                  style={[styles.h1Text, { color: tintColor, fontSize: 14 }]}
                >
                  H3
                </Text>
              ),
              insertHTML: html,
              insertVideo: video,
            }}
            // insertEmoji={this.handleEmoji}
            // insertHTML={this.insertHTML}
            // insertVideo={() => this.getPermission(false)}
          />
          {/* {emojiVisible && <EmojiView onSelect={this.insertEmoji} />} */}
        </KeyboardAvoidingView>
        <SelectCategorie
          categoriesSelectorVisible={selectCategoryModalVisible}
          closeCategorySelector={() => {
            this.setState({ selectCategoryModalVisible: false });
          }}
          selectCategory={(name, id, color) => {
            this.setState({
              categoryName: name,
              categoryId: id,
              categoryColor: color,
              changeMade: categoryId === id ? false : true,
            });
          }}
        />
        <Dilogue
          dilogueVisible={showDiscardChangesDilogue}
          closeDilogue={() => {
            this.setState({ showDiscardChangesDilogue: false });
          }}
          cancellable={false}
          dilogueBackground={primaryErrColor}
          transparentBackColor={"#0000"}
        >
          <View>
            <Text style={styles.dilogueHeader}>Discard changes?</Text>
            <Text style={styles.dilogueTxt}>
              You have unsaved changes. Are you sure to discard them and leave
              the screen?
            </Text>
            <View style={styles.dilogueBtnsView}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showDiscardChangesDilogue: false });
                }}
              >
                <Text style={styles.dilogueBtn}>Don't leave</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showDiscardChangesDilogue: false });
                  this.props.navigation.dispatch(currentNavAction);
                }}
              >
                <Text style={styles.dilogueBtn}>Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Dilogue>
      </SafeAreaView>
    );
  }
}

const actionSheetConnectedEditor = connectActionSheet(Editor);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(actionSheetConnectedEditor);

const styles = StyleSheet.create({
  categoryView: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginVertical: 3,
  },
  categoryTxt: {
    fontSize: 12,
    fontWeight: "700",
  },
  topBtnsView: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 0.7,
    justifyContent: "space-between",
  },
  topBtnTxt: { fontSize: 17, fontWeight: "700", color: "#888" },
  backBtn: {
    alignItems: "flex-start",
    marginRight: 30,
  },
  titleInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: lightModeTextHardColor,
  },
  h1Text: {
    textAlign: "center",
    color: "#515156",
    // color: tintColor,
  },
  dilogueHeader: {
    fontSize: 17,
    fontWeight: "700",
    paddingHorizontal: 10,
    color: backColorTwo,
  },
  dilogueTxt: {
    fontSize: 14,
    color: backColorTwo,
    paddingTop: 10,
    paddingLeft: 10,
  },
  dilogueBtnsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  dilogueBtn: { fontSize: 16, fontWeight: "700", color: backColorTwo },
});
