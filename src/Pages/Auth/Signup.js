import { Feather } from "@expo/vector-icons";
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

export default function Signup(props) {
  // local state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [reEnterPass, setReEnterPass] = useState("");
  const [shouldShowPassword, setShouldShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errMess, setErrMess] = useState(null);

  return (
    <View style={{ backgroundColor: backColor }}>
      <View style={styles.header}>
        <Feather
          onPress={() => {
            props.onLoginPress();
          }}
          name="chevron-left"
          size={30}
          color={lightModeTextHardColor}
          style={{ paddingRight: 10 }}
        />
        <Text style={styles.headerText}>SignUp</Text>
      </View>
      <View>
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
        <View style={[styles.textInput, styles.textInputView]}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={reEnterPass}
            onChangeText={(text) => {
              setReEnterPass(text);
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
          <Text style={styles.loginBtnTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
