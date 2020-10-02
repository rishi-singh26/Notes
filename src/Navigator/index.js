import * as React from "react";
import { Button, View, StatusBar } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { backColor } from "../Styles";
import CustomDrawerContent from "./CustomDrawerContent";
import { useSelector, useDispatch } from "react-redux";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import MyStack from "./Stack";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import ResetPassword from "../Pages/Auth/ResetPassword";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function Navigator(props) {
  const drawerSwipe = useSelector((state) => state.drawerSwipe);

  const [authState, setAuthState] = React.useState(true);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={backColor} />
      {!authState ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      ) : (
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
      )}
    </NavigationContainer>
  );
}
