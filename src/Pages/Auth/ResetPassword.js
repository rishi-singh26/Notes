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

export default function ResetPassword(props) {
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
        <Text style={styles.headerText}>Reset Password</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnTxt}>Send Password Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
        <Text
          style={[
            styles.loginBtnTxt,
            { color: lightModeTextHardColor, alignSelf: "center" },
          ]}
        >
          SignUp
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
    marginHorizontal: 40,
    marginVertical: 20,
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
