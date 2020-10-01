import * as ActionTypes from "./ActionTypes";

export const DrawerSwipe = (
  state = {
    shouldSwipe: true,
  },
  action
) => {
  switch (action.type) {
    //
    case ActionTypes.START_SWIPE:
      return {
        ...state,
        shouldSwipe: true,
      };

    case ActionTypes.STOP_SWIPE:
      return {
        ...state,
        shouldSwipe: false,
      };

    default:
      return state;
  }
};
