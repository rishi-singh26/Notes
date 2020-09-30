import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Editor from "../Pages/Editor/index";
import Notes from "../Pages/Notes/index";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Editor" component={Editor} />
    </Stack.Navigator>
  );
}
