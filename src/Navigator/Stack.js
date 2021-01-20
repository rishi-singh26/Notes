import * as React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Editor from "../Pages/Editor/index";
import Notes from "../Pages/Notes/index";
import Profile from "../Pages/Profile/index";
import ManageCategories from "../Pages/Categories/ManageCategories";
import { backColor } from "../Styles";
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Editor" component={Editor} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
          headerShown: true,
          headerStyle: { backgroundColor: backColor },
          title: "Account",
        }}
      />
      <Stack.Screen name="ManageCategories" component={ManageCategories} />
    </Stack.Navigator>
  );
}
