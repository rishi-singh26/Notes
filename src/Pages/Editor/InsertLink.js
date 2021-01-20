import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Dilogue from "../../Components/Dilogue";
import { toast } from "../../Functions";
import { backColor, backColorTwo } from "../../Styles";

export default function InsertLink({
  showDilogue,
  closeDilogue,
  linkTitle,
  setTitleChange,
  linkData,
  setDataChange,
  submitLink,
}) {
  return (
    <Dilogue
      dilogueVisible={showDilogue}
      closeDilogue={() => {
        closeDilogue();
      }}
      cancellable={true}
      dilogueBackground={backColorTwo}
      transparentBackColor={"#0001"}
    >
      <View>
        <Text style={styles.dilogueHeader}>Insert Link</Text>
        <Text style={styles.dilogueTxt}>Enter Text</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          keyboardType="default"
          value={linkTitle}
          onChangeText={(text) => {
            setTitleChange(text);
          }}
          autoFocus={true}
        />
        <Text style={styles.dilogueTxt}>Enter Link</Text>
        <TextInput
          style={styles.input}
          placeholder="Link"
          keyboardType="url"
          autoCapitalize={"none"}
          value={linkData}
          onChangeText={(text) => {
            setDataChange(text);
          }}
          textContentType="URL"
        />
        <View style={styles.dilogueBtnsView}>
          <TouchableOpacity
            onPress={() => {
              closeDilogue();
              setTitleChange("");
              setDataChange("https://");
            }}
          >
            <Text style={styles.dilogueBtn}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
              const second = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
              const result = linkData.match(urlRegex);
              const resultTwo = linkData.match(second);
              if (result || resultTwo) {
                closeDilogue();
                setTitleChange("");
                setDataChange("");
                submitLink(linkTitle, linkData);
              } else {
                toast("Enter a valid url");
              }
            }}
          >
            <Text style={styles.dilogueBtn}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dilogue>
  );
}

const styles = StyleSheet.create({
  dilogueHeader: {
    fontSize: 17,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // color: backColorTwo,
  },
  dilogueTxt: {
    fontSize: 14,
    // color: backColorTwo,
    paddingTop: 10,
    paddingLeft: 10,
  },
  dilogueBtnsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  dilogueBtn: {
    fontSize: 16,
    fontWeight: "700",
    //   color: backColorTwo
  },
  input: {
    backgroundColor: backColor,
    marginHorizontal: 10,
    paddingHorizontal: 13,
    marginVertical: 10,
    paddingVertical: 7,
    borderRadius: 7,
    fontSize: 14,
  },
});
