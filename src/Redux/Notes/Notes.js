import * as ActionTypes from "./ActionTypes";

export const Notes = (
  state = {
    data: [],
    isLoading: false,
    errMess: null,
    deleted: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_NOTE:
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        errMess: null,
        deleted: [],
      };

    case ActionTypes.EDIT_NOTE:
      const index = action.payload.index;
      const note = action.payload.note;

      let currentNotesToBeEdited = state.data;

      currentNotesToBeEdited.splice(index, 1, note);
      return {
        ...state,
        data: currentNotesToBeEdited,
        isLoading: false,
        errMess: null,
        deleted: [],
      };

    case ActionTypes.DELETE_NOTE:
      let currentNotesToBeDeleted = state.data;

      const deletedItem = currentNotesToBeDeleted[action.payload];

      currentNotesToBeDeleted.splice(action.payload, 1);
      return {
        ...state,
        data: currentNotesToBeDeleted,
        isLoading: false,
        errMess: null,
        deleted: [...state.deleted, deletedItem],
      };
    default:
      return state;
  }
};
