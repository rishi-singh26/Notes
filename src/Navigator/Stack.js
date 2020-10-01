import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Editor from "../Pages/Editor/index";
import Notes from "../Pages/Notes/index";
import ManageCategories from "../Pages/Categories/ManageCategories";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notes" component={Notes} />
      {/* <Stack.Screen name="Editor" component={Editor} /> */}
      <Stack.Screen name="ManageCategories" component={ManageCategories} />
    </Stack.Navigator>
  );
}
