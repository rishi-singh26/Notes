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
      let currentNotesToBeEdited = state.data;

      const index = action.payload.index;
      const note = action.payload.note;

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

    case ActionTypes.TOGGLE_LOCK_NOTE:
      let currentAllNotes = state.data;

      const noteToBeLocked = currentAllNotes[action.payload];
      noteToBeLocked.isLocked = !noteToBeLocked.isLocked;

      currentAllNotes.splice(action.payload, 1, noteToBeLocked);
      return {
        ...state,
        data: currentAllNotes,
        isLoading: false,
        errMess: null,
        deleted: state.deleted,
      };

    case ActionTypes.NOTES_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.NOTES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case ActionTypes.NOTES_ERR:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
