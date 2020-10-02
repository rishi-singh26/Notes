import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  backColor,
  backColorTwo,
  lightModeBtnBackColor,
  lightModeTextHardColor,
} from "../../Styles";

export default function Signup(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
      <View style={styles.header}>
        <Feather
          onPress={() => {
            props.navigation.goBack();
          }}
          name="chevron-left"
          size={30}
          color={lightModeTextHardColor}
          style={{ paddingRight: 10 }}
        />
        <Text style={styles.headerText}>SignUp</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnTxt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ResetPassword")}
      >
        <Text
          style={[
            styles.loginBtnTxt,
            { color: lightModeTextHardColor, alignSelf: "center" },
          ]}
        >
          Forgot Password
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 23,
    marginTop: 40,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: lightModeTextHardColor,
  },
  textInput: {
    backgroundColor: lightModeBtnBackColor,
    marginHorizontal: 25,
    marginVertical: 13,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  loginBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 40,
    alignItems: "center",
    backgroundColor: lightModeTextHardColor,
    borderRadius: 10,
  },
  loginBtnTxt: {
    color: backColorTwo,
    fontSize: 17,
    fontWeight: "700",
  },
});
