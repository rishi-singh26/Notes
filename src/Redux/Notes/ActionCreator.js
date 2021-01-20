import { auth, firestore } from "../../Firebase";
import * as ActionTypes from "./ActionTypes";

export const createNote = (note) => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }

  firestore
    .collection("notes")
    .doc(note._id)
    .set({ ...note, userId: auth.currentUser.uid })
    .then(() => {
      console.log("Note added from ACTION CREATOR");
      dispatch(createOneNote(note));
      dispatch(getNotes());
    })
    .catch((err) => {
      console.log("Err in adding note from action creator", err.message);
    });
};

const createOneNote = (note) => ({
  type: ActionTypes.CREATE_NOTE,
  payload: note,
});

export const editNote = (note, index) => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }

  firestore
    .collection("notes")
    .doc(note._id)
    .update(note)
    .then(() => {
      console.log("Note added from ACTION CREATOR");
      dispatch(editOneNote(note, index));
      dispatch(getNotes());
    })
    .catch((err) => {
      console.log("Err in adding note from action creator", err.message);
    });
};

const editOneNote = (note, index) => ({
  type: ActionTypes.EDIT_NOTE,
  payload: { index, note },
});

export const deleteNote = (index, note) => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }

  firestore
    .collection("notes")
    .doc(note._id)
    .delete()
    .then(() => {
      console.log("Note added from ACTION CREATOR");
      dispatch(deleteOneNote(index));
      dispatch(getNotes());
    })
    .catch((err) => {
      console.log("Err in adding note from action creator", err.message);
    });
};

const deleteOneNote = (index) => ({
  type: ActionTypes.DELETE_NOTE,
  payload: index,
});

export const toggleLockNote = (index, mode, note) => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }

  firestore
    .collection("notes")
    .doc(note._id)
    .update({ isLocked: mode })
    .then(() => {
      console.log("Note added from ACTION CREATOR");
      dispatch(toggleLockOneNote(index));
      dispatch(getNotes());
    })
    .catch((err) => {
      console.log("Err in adding note from action creator", err.message);
    });
};

const toggleLockOneNote = (index) => ({
  type: ActionTypes.TOGGLE_LOCK_NOTE,
  payload: index,
});

export const getNotes = () => (dispatch) => {
  if (!auth.currentUser) return;

  dispatch(notesLoading());

  firestore
    .collection("notes")
    .where("userId", "==", auth.currentUser.uid)
    .get()
    .then((resp) => {
      let notes = [];
      resp.forEach((note) => {
        const data = note.data();
        notes.push(data);
      });
      dispatch(notesSuccess(notes));
    })
    .catch((err) => {
      console.log(("Err in getting notes ACTION CREATOR", err.message));
      dispatch(notesErr(err.message));
    });
};

const notesLoading = () => ({
  type: ActionTypes.NOTES_LOADING,
});
const notesErr = (message) => ({
  type: ActionTypes.NOTES_ERR,
  payload: message,
});
const notesSuccess = (notes) => ({
  type: ActionTypes.NOTES_SUCCESS,
  payload: notes,
});
