import { ToastAndroid } from "react-native";

export function toast(message) {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
}

export function findCategoryColorUsingId(categories, catId) {
  let color = "";

  // console.log("from function", { categories, catId });

  for (let i = 0; i < categories.data.length; i++) {
    if (categories.data[i].id === catId) {
      color = categories.data[i].color;
      break;
    } else {
      // console.log(categories.data[i].color);
    }
  }
  // console.log(color);
  return color;
}
