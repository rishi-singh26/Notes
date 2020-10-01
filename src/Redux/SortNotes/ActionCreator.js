import * as ActionTypes from "./ActionTypes";

export const sortNote = (categoryId, categoryName) => (dispatch) => {
  dispatch(filterNotesByCategory(categoryId, categoryName));
};

const filterNotesByCategory = (categoryId, categoryName) => ({
  type: ActionTypes.SORT_NOTES,
  payload: { categoryId, categoryName },
});

export const resetSort = () => (dispatch) => {
  dispatch(resetFilters());
};

const resetFilters = () => ({
  type: ActionTypes.RESET_SORT,
});
