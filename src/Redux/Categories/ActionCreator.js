import * as ActionTypes from "./ActionTypes";

export const createCategory = (category) => (dispatch) => {
  dispatch(createOneCategory(category));
};

const createOneCategory = (category) => ({
  type: ActionTypes.CREATE_CATEGORY,
  payload: category,
});

export const deleteCategory = (index) => (dispatch) => {
  dispatch(deleteOneCategory(index));
};

const deleteOneCategory = (index) => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: index,
});

export const editCategory = (category, index) => (dispatch) => {
  dispatch(editOneCategory(category, index));
};

const editOneCategory = (category, index) => ({
  type: ActionTypes.EDIT_CATEGORY,
  payload: { category, index },
});
