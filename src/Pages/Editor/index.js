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
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import {
  backColor,
  lightModeTextHardColor,
  lightModeTextLightColor,
  primaryColor,
} from "../../Styles";
import { createNote, editNote } from "../../Redux/Notes/ActionCreator";
import {
  startDrawerSwipe,
  stopDrawerSwipe,
} from "../../Redux/DrawerSwipe/ActionCreator";
import { connect } from "react-redux";
import SelectCategorie from "../Categories/SelectCategory";
import { findCategoryColorAndNameUsingId, toast } from "../../Functions/index";

const { strikeThrough, video, html, emoji } = Assets;

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
});

class Editor extends React.Component {
  richText = React.createRef();
  linkModal = React.createRef();

  constructor(props) {
    super(props);
    const { isNew, data, index, categoryId } = this.props.route.params;
    let disabled = false;
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
      disabled = false;
      catId = categoryId;
      catName = catData.name;
      categoryColor = catData.color;
    } else {
      const catData = findCategoryColorAndNameUsingId(
        props.categories,
        data.categoryId
      );
      disabled = true;
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
      disabled,
      title,
      categoryName: catName,
      categoryId: catId,
      categoryColor,
      emojiVisible: false,
      changeMade: false,
      image: null,
      selectCategoryModalVisible: false,
    };
  }

  componentDidMount() {
    Appearance.addChangeListener(this.themeChange);
    Keyboard.addListener("keyboardDidShow", this.onKeyBoard);
    // stop drawer swipe
    this.props.stopDrawerSwipe();
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener("keyboardDidShow", this.onKeyBoard);
    // start drawer swipe
    this.props.startDrawerSwipe();
  }

  onKeyBoard = () => {
    // TextInput.State.currentlyFocusedField() &&
    this.setState({ emojiVisible: false });
  };

  getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
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
      // allowsMultipleSelection: true,
      // exif: true,
    });

    // result.cancelled ? null : this.richText.current?.insertImage(result.uri);
    result.cancelled
      ? null
      : this.richText.current?.insertImage(
          `data:${result.type}/*;base64,${result.base64}`
        );

    // console.log("HERE IS IMAGE", result);
    let html = await this.richText.current?.getContentHtml();
    // console.log(html);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  onPressAddImage = () => {
    // insert URL
    this.richText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    // this.richText.current?.blurContentEditor();
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

  insertVideo = () => {
    this.richText.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    );
  };

  onDisabled = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  insertHTML = () => {
    this.richText.current?.insertHTML(
      `<span style="color: blue; padding:0 10px;">HTML</span>`
    );
  };

  onLinkDone = ({ title, url }) => {
    this.richText.current?.insertLink(title, url);
  };

  save = async () => {
    const { isNew, data, index } = this.props.route.params;

    // Get the data here and call the interface to save the data
    let html = await this.richText.current?.getContentHtml();

    if (isNew && html == "" && this.state.title == "") {
      toast("Nothing to save!");
      return;
    }
    const currentDate = new Date();

    const note = {
      title: this.state.title,
      content: html,
      desc: "",
      createdDate: currentDate.toDateString(),
      createdTimeMiliSec: currentDate.getTime(),
      isLocked: isNew ? false : data.isLocked,
      categoryId: this.state.categoryId,
      updatedDate: currentDate.toDateString(),
      updatedTimeMiliSec: currentDate.getTime(),
    };

    // const date = new Date(item.updateDate.seconds * 1000).toDateString();
    isNew ? this.props.createNote(note) : this.props.editNote(note, index);
    this.setState({ disabled: !this.state.disabled, changeMade: false });
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

  render() {
    const {
      contentStyle,
      theme,
      disabled,
      title,
      changeMade,
      categoryName,
      categoryId,
      categoryColor,
      selectCategoryModalVisible,
    } = this.state;
    const { isNew, data, index } = this.props.route.params;
    const { backgroundColor, color, placeholderColor } = contentStyle;
    const themeBg = { backgroundColor };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
        {/* <InsertLinkModal
                    placeholderColor={placeholderColor}
                    color={color}
                    backgroundColor={backgroundColor}
                    onDone={that.onLinkDone}
                    ref={that.linkModal}
                /> */}
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
                this.onDisabled();
              }}
            >
              <Text style={styles.topBtnTxt}>
                {disabled ? "Edit" : "Pause"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => {
                isNew ? this.save() : changeMade ? this.save() : null;
              }}
            >
              <Text style={styles.topBtnTxt}>
                {changeMade ? "Save" : isNew ? "Save" : "Saved"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView keyboardDismissMode={"none"}>
          {disabled ? (
            <View
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
            </View>
          ) : (
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
          )}
          <TextInput
            style={styles.titleInput}
            editable={!disabled}
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
            disabled={disabled}
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
            disabled={disabled}
            iconTint={color}
            selectedIconTint={"#2095F2"}
            disabledIconTint={"#8b8b8b"}
            onPressAddImage={this.getPermission}
            // onInsertLink={this.onInsertLink}
            iconSize={50} // default 50
            actions={[
              // "insertVideo",
              ...defaultActions,
              actions.setStrikethrough,
              actions.heading1,
              actions.heading3,
              actions.heading4,
              "insertHTML",
            ]} // default defaultActions
            iconMap={{
              [actions.setStrikethrough]: strikeThrough,
              [actions.heading1]: ({ tintColor }) => (
                <Text style={[styles.h1Text, { color: tintColor }]}>H1</Text>
              ),
              [actions.heading3]: ({ tintColor }) => (
                <Text style={[styles.h1Text, { color: tintColor }]}>H2</Text>
              ),
              [actions.heading4]: ({ tintColor }) => (
                <Text style={[styles.h1Text, { color: tintColor }]}>H3</Text>
              ),
              insertHTML: html,
              insertVideo: video,
            }}
            // insertEmoji={this.handleEmoji}
            insertHTML={this.insertHTML}
            // insertVideo={this.getPermission}
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
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

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
    paddingHorizontal: 20,
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
});
