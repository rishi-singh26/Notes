import * as ActionTypes from "./ActionTypes";

export const SortNotes = (state = { _id: -11, name: "Notes" }, action) => {
  switch (action.type) {
    //
    case ActionTypes.SORT_NOTES:
      // console.log("sorting data", action.payload);
      return {
        ...state,
        _id: action.payload.categoryId,
        name: action.payload.categoryName,
      };

    case ActionTypes.RESET_SORT:
      return { ...state, _id: -11, name: "Notes" };

    default:
      return state;
  }
};
