import React from "react";
import { Button, View, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { backColor } from "../Styles";
import CustomDrawerContent from "./CustomDrawerContent";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import MyStack from "./Stack";
import Authentication from "../Pages/Authentication/index";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Navigator(props) {
  const drawerSwipe = useSelector((state) => state.drawerSwipe);
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={backColor} />
      {auth.isAuthenticated ? (
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
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Authentication" component={Authentication} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
