import * as React from "react";
import { Button, View, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { backColor } from "../Styles";
import CustomDrawerContent from "./CustomDrawerContent";
import { useSelector, useDispatch } from "react-redux";

import MyStack from "./Stack";

const Drawer = createDrawerNavigator();

export default function Navigator(props) {
  const drawerSwipe = useSelector((state) => state.drawerSwipe);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={backColor} />
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{ width: "75%" }}
        initialRouteName="MyStack"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: "#000",
        }}
        screenOptions={{ swipeEnabled: drawerSwipe.shouldSwipe }}
      >
        <Drawer.Screen name="MyStack" component={MyStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
