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

  // console.log("from function", { categories, catId });

  for (let i = 0; i < categories.data.length; i++) {
    if (categories.data[i]._id === catId) {
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

export function validateEmail(email) {
  // this is also an option for email regx
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRe.test(String(email).toLowerCase());
}

export function getDateString(date) {
  if (date.seconds) {
    var newDate = new Date(1970, 0, 1); // Epoch
    newDate.setSeconds(date.seconds);
    return newDate;
  } else {
    return date;
  }
}
