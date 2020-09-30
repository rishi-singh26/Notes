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
} from "../../Styles";

const initHTML = ``;

const { strikeThrough, video, html, emoji } = Assets;

export default class Editor extends React.Component {
  richText = React.createRef();
  linkModal = React.createRef();

  constructor(props) {
    super(props);
    // const theme = props.theme || Appearance.getColorScheme();
    const theme = Appearance.getColorScheme();
    const contentStyle = this.createContentStyle(theme);

    this.state = {
      theme: theme,
      contentStyle,
      emojiVisible: false,
      disabled: false,
      image: null,
    };
  }

  getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  componentDidMount() {
    Appearance.addChangeListener(this.themeChange);
    Keyboard.addListener("keyboardDidShow", this.onKeyBoard);
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener("keyboardDidShow", this.onKeyBoard);
  }

  onKeyBoard = () => {
    // TextInput.State.currentlyFocusedField() &&
    this.setState({ emojiVisible: false });
  };

  handleChange = (html) => {
    // console.log("editor data:", html);
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

  onPressAddImage = () => {
    // insert URL
    this.richText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    // this.richText.current?.blurContentEditor();
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
    // Get the data here and call the interface to save the data
    let html = await this.richText.current?.getContentHtml();
    // console.log(html);
    alert(html);
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
    let that = this;
    const { contentStyle, theme, emojiVisible, disabled } = this.state;
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
                {disabled ? "Resume" : "Pause"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => {
                this.save();
              }}
            >
              <Text style={styles.topBtnTxt}>{"Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView keyboardDismissMode={"none"}>
          <TextInput
            style={styles.titleInput}
            editable={!disabled}
            placeholderTextColor={placeholderColor}
            placeholder={"Title"}
          />
          <RichEditor
            initialFocus={false}
            disabled={disabled}
            editorStyle={contentStyle} // default light style
            containerStyle={themeBg}
            ref={this.richText}
            style={[{ minHeight: 300, flex: 1 }, themeBg]}
            placeholder={"Note"}
            initialContentHTML={initHTML}
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
            onPressAddImage={this.onPressAddImage}
            // onInsertLink={this.onInsertLink}
            iconSize={40} // default 50
            actions={[
              //   "insertVideo",
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
            // insertVideo={this.insertVideo}
          />
          {/* {emojiVisible && <EmojiView onSelect={this.insertEmoji} />} */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
  },
  h1Text: {
    textAlign: "center",
    color: "#515156",
    // color: tintColor,
  },
});