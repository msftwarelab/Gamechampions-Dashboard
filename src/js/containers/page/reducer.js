import { fromJS } from "immutable";
import { combineReducers } from "redux-immutable";

import * as CONSTANTS from "./constants";
import reducerRegistry from "../../util/reducerRegistry";
import pageReducerRegistry from "./pageReducerRegistry";

const initialState = fromJS({
  title: "",
  html: "",
  buttons: [],
  url: "",
  images: [],
  meta: {}
});

export const createPageReducerWithNamedType = (reducerName = "") => {
  return (state = initialState, action) => {
    switch (action.type) {
      case `${CONSTANTS.SET_PAGE}/${reducerName}`:
        return state
          .set("title", action.data.title)
          .set("html", action.data.html)
          .set("buttons", action.data.buttons)
          .set("url", action.data.url)
          .set("images", action.data.images)
          .set("meta", action.data.meta);
      default:
        return state;
    }
  };
};

export const getPageState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const createReducer = reducerName => {
  const reducer = createPageReducerWithNamedType(reducerName);
  pageReducerRegistry.register(reducerName, reducer);

  const pageReducer = pageReducerRegistry.getReducers();

  reducerRegistry.register(
    CONSTANTS.REDUCER_NAME,
    combineReducers({
      ...pageReducer
    })
  );
};

reducerRegistry.register(CONSTANTS.REDUCER_NAME, () => null);
