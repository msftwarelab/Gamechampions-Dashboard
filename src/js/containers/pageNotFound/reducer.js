import { fromJS } from "immutable";

import * as CONSTANTS from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  title: "",
  html: ""
});

export const pageNotFoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_PAGE_NOT_FOUND:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html);
    default:
      return state;
  }
};

export const getPageNotFoundState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectTitle = state => getPageNotFoundState(state).get("title");
export const selectHtml = state => getPageNotFoundState(state).get("html");

reducerRegistry.register(CONSTANTS.REDUCER_NAME, pageNotFoundReducer);
