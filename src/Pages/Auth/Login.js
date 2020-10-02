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

export default function Login(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notes</Text>
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
      <Text
        onPress={() => props.navigation.navigate("ResetPassword")}
        style={[
          styles.loginBtnTxt,
          { color: lightModeTextHardColor, alignSelf: "center" },
        ]}
      >
        Forgot Password
      </Text>
      <Text
        onPress={() => props.navigation.navigate("Signup")}
        style={[
          styles.loginBtnTxt,
          {
            color: lightModeTextHardColor,
            alignSelf: "center",
            marginTop: 15,
          },
        ]}
      >
        SignUp
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 30,
    marginTop: 40,
    marginBottom: 50,
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
