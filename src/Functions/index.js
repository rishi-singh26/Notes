import { ToastAndroid } from "react-native";

export function toast(message) {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
}

export function findCategoryColorAndNameUsingId(categories, catId) {
  let color = "#888";
  let name = "Uncategorised";

  console.log("from function", { categories, catId });

  for (let i = 0; i < categories.data.length; i++) {
    if (categories.data[i].id === catId) {
      color = categories.data[i].color;
      name = categories.data[i].name;
      break;
    } else {
      // console.log(categories.data[i].color);
    }
  }
  // console.log(color);
  return { color, name };
}
