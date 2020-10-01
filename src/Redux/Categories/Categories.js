import * as ActionTypes from "./ActionTypes";

export const Categories = (
  state = {
    data: [
      {
        name: "Uncategorised",
        id: 0,
        color: "#888",
        count: 0,
      },
    ],
    isLoading: false,
    errMess: null,
    deleted: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_CATEGORY:
      return {
        ...state,
        data: [action.payload, ...state.data],
        isLoading: false,
        errMess: null,
        deleted: [],
      };

    case ActionTypes.EDIT_CATEGORY:
      let currentCategoriesToBeEdited = state.data;

      const index = action.payload.index;
      const category = action.payload.category;

      currentCategoriesToBeEdited.splice(index, 1, category);
      return {
        ...state,
        data: currentCategoriesToBeEdited,
        isLoading: false,
        errMess: null,
        deleted: [],
      };

    case ActionTypes.DELETE_CATEGORY:
      let currentCategoriesToBeDeleted = state.data;

      const deletedCategory = currentCategoriesToBeDeleted[action.payload];

      currentCategoriesToBeDeleted.splice(action.payload, 1);
      return {
        ...state,
        data: currentNotesToBeDeleted,
        isLoading: false,
        errMess: null,
        deleted: [...state.deleted, deletedCategory],
      };

    default:
      return state;
  }
};
