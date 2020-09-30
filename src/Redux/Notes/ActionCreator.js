import * as ActionTypes from "./ActionTypes";

export const createNote = (note) => (dispatch) => {
  dispatch(createOneNote(note));
};

const createOneNote = (note) => ({
  type: ActionTypes.CREATE_NOTE,
  payload: note,
});

export const editNote = (note, index) => (dispatch) => {
  dispatch(editOneNote(note, index));
};

const editOneNote = (note, index) => ({
  type: ActionTypes.EDIT_NOTE,
  payload: { index, note },
});

export const deleteNote = (index) => (dispatch) => {
  dispatch(deleteOneNote(index));
};

const deleteOneNote = (index) => ({
  type: ActionTypes.DELETE_NOTE,
  payload: index,
});

export const toggleLockNote = (index) => (dispatch) => {
  dispatch(toggleLockOneNote(index));
};

const toggleLockOneNote = (index) => ({
  type: ActionTypes.TOGGLE_LOCK_NOTE,
  payload: index,
});
