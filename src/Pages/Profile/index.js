import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { auth } from "../../Firebase";
import { backColor } from "../../Styles";
import { Feather } from "@expo/vector-icons";

export default function Profile(props) {
  const setHeaderOptions = () => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={styles.headerIconStyle}
            onPress={() => {
              alert("Settings pressed");
            }}
          >
            <Feather name="settings" size={23} color={"black"} />
          </TouchableOpacity>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={styles.headerIconStyle}
            onPress={() => {
              alert("Settings pressed");
            }}
          >
            <Feather
              name="chevron-left"
              size={25}
              color={"black"}
              onPress={() => props.navigation.goBack()}
            />
          </TouchableOpacity>
        );
      },
    });
  };

  useEffect(() => {
    setHeaderOptions();
  }, []);

  const authentication = useSelector((state) => state.auth);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 10,
        }}
      >
        <Image
          source={{
            uri:
              auth?.currentUser?.photoURL ||
              "https://www.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png",
          }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            marginHorizontal: 23,
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 16 }}>Rishi Singh</Text>
          <Text style={{ fontSize: 16 }}>rishisingh@gmail.com</Text>
        </View>
      </View>
      <Text>{JSON.stringify(authentication, null, 4)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerIconStyle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
