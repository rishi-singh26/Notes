import * as ActionTypes from "./ActionTypes";

export const startDrawerSwipe = () => (dispatch) => {
  dispatch(startSwipe());
};

const startSwipe = () => ({
  type: ActionTypes.START_SWIPE,
});

export const stopDrawerSwipe = () => (dispatch) => {
  dispatch(stopSwipe());
};

const stopSwipe = () => ({
  type: ActionTypes.STOP_SWIPE,
});
