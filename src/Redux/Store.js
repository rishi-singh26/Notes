import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import { Notes } from "./Notes/Notes";
import { Categories } from "./Categories/Categories";
import { SortNotes } from "./SortNotes/SortNptes";
import { DrawerSwipe } from "./DrawerSwipe/DrawerSwipe";

export const ConfigureStore = () => {
  const config = {
    key: "root",
    storage: AsyncStorage,
    debug: true,
    blacklist: ["sortNotes", "drawerSwipe"],
  };
  const store = createStore(
    persistCombineReducers(config, {
      notes: Notes,
      categories: Categories,
      sortNotes: SortNotes,
      drawerSwipe: DrawerSwipe,
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
