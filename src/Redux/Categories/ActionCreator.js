import { auth, firestore } from "../../Firebase";
import * as ActionTypes from "./ActionTypes";

export const createCategory = (category) => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }

  var userId = auth.currentUser.uid;

  firestore
    .collection("categories")
    .doc(category._id)
    .set({ ...category, userId })
    .then((resp) => {
      console.log(resp);
      dispatch(createOneCategory(category));
      dispatch(getCategories());
      console.log("Category added");
    })
    .catch((err) =>
      console.log("Err in Adding Category ACTION CREATOR", err.message)
    );
};

const createOneCategory = (category) => ({
  type: ActionTypes.CREATE_CATEGORY,
  payload: category,
});

export const deleteCategory = (index, id) => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }

  firestore
    .collection("categories")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Category deleted");
      dispatch(getCategories());
      dispatch(deleteOneCategory(index));
    })
    .catch((err) =>
      console.log("Err in deleting category ACTION CREATOR", err.message)
    );
};

const deleteOneCategory = (index) => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: index,
});

export const editCategory = (category, index) => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }

  firestore
    .collection("categories")
    .doc(category.id)
    .update(category)
    .then(() => {
      console.log("Category edited");
      dispatch(editOneCategory(category, index));
      dispatch(getCategories());
    })
    .catch((err) => {
      console.log("Err in editing category", err.message);
    });
};

const editOneCategory = (category, index) => ({
  type: ActionTypes.EDIT_CATEGORY,
  payload: { category, index },
});

export const getCategories = () => (dispatch) => {
  if (!auth.currentUser) {
    return;
  }
  dispatch(categoriesLoading());
  firestore
    .collection("categories")
    .where("userId", "==", auth.currentUser.uid)
    .get()
    .then((resp) => {
      let categoriesData = [];
      resp.forEach((category) => {
        const data = category.data();
        categoriesData.push(data);
      });
      dispatch(categoriesSuccess(categoriesData));
    })
    .catch((err) => {
      dispatch(categoriesErr(err.message));
      console.log("Error in getting categories ACTION CREATOR", err.message);
    });
};

const categoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_LOADING,
});
const categoriesErr = (message) => ({
  type: ActionTypes.CATEGORIES_ERR,
  payload: message,
});
const categoriesSuccess = (categories) => ({
  type: ActionTypes.CATEGORIES_SUCCESS,
  payload: categories,
});
