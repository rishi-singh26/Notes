import * as ActionTypes from "./ActionTypes";

export const SortNotes = (state = { id: -11, name: "Notes" }, action) => {
  switch (action.type) {
    //
    case ActionTypes.SORT_NOTES:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
      };

    case ActionTypes.RESET_SORT:
      return { ...state, id: -11, name: "Notes" };

    default:
      return state;
  }
};
