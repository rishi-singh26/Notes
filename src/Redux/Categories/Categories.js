import * as ActionTypes from "./ActionTypes";

export const Categories = (
  state = {
    data: [],
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_CATEGORY:
      return {
        ...state,
        data: [action.payload, ...state.data],
        errMess: null,
      };

    case ActionTypes.EDIT_CATEGORY:
      let currentCategoriesToBeEdited = state.data;

      const index = action.payload.index;
      const category = action.payload.category;

      currentCategoriesToBeEdited.splice(index, 1, category);
      return {
        ...state,
        data: currentCategoriesToBeEdited,
        errMess: null,
      };

    case ActionTypes.DELETE_CATEGORY:
      let currentCategoriesToBeDeleted = state.data;
      currentCategoriesToBeDeleted.splice(action.payload, 1);
      return {
        ...state,
        data: currentCategoriesToBeDeleted,
        errMess: null,
      };

    case ActionTypes.CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case ActionTypes.CATEGORIES_ERR:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
