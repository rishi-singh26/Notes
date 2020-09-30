import * as React from "react";
import { Button, View, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./Stack";
import { backColor } from "../Styles";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={backColor} />
      <Drawer.Navigator
        drawerStyle={{ width: "75%" }}
        initialRouteName="MyStack"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: "#000",
        }}
      >
        <Drawer.Screen name="MyStack" component={MyStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
