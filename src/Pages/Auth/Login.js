import React, { useState } from "react";
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
  lightModeTextLightColor,
  primaryColor,
} from "../../Styles";
import { Feather } from "@expo/vector-icons";

export default function Login(props) {
  // local state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [shouldShowPassword, setShouldShowPassword] = useState(true);

  return (
    <View style={{ backgroundColor: backColor }}>
      <View style={styles.header}>
        <Feather
          color={backColorTwo}
          size={20}
          name="file-text"
          style={styles.iconStyle}
        />
        <Text style={styles.headerText}>Notes</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <View style={[styles.textInput, styles.textInputView]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={pass}
          onChangeText={(text) => {
            setPass(text);
          }}
          style={{ flex: 1 }}
          secureTextEntry={shouldShowPassword}
        />
        <Feather
          color={lightModeTextLightColor}
          size={18}
          name={shouldShowPassword ? "eye" : "eye-off"}
          onPress={() => {
            setShouldShowPassword(!shouldShowPassword);
          }}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnTxt}>Login</Text>
      </TouchableOpacity>
      <View style={styles.btnsView}>
        <Text
          onPress={() => props.onForgotPassPress()}
          style={[styles.loginBtnTxt, styles.forgotPasswordBtn]}
        >
          Forgot Password
        </Text>
        <Text
          onPress={() => props.onSignupPress()}
          style={[styles.loginBtnTxt, styles.signUpBtn]}
        >
          SignUp
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnsView: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordBtn: {
    color: lightModeTextHardColor,
    alignSelf: "center",
    marginTop: 15,
    marginHorizontal: 5,
    paddingRight: 10,
    borderRightColor: lightModeTextHardColor,
    borderRightWidth: 1,
  },
  signUpBtn: {
    color: lightModeTextHardColor,
    alignSelf: "center",
    marginTop: 15,
    marginHorizontal: 5,
  },
  iconStyle: {
    backgroundColor: primaryColor,
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
  },
  header: {
    marginHorizontal: 30,
    marginTop: 40,
    marginBottom: 50,
    flexDirection: "row",
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
    fontSize: 15,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
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
