import { fromJS } from "immutable";

import { SET_SUCCESS, REDUCER_NAME, RESET_ERROR, SET_ERROR } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  isSuccess: false,
  isError: false,
  errorMessage: ""
});

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESS:
      return state.set("isSuccess", true).set("isError", false);
    case SET_ERROR:
      return state
        .set("isError", true)
        .set("errorMessage", action.data.errorMessage);
    case RESET_ERROR:
      return state
        .set("isError", initialState.get("isError"))
        .set("errorMessage", initialState.get("errorMessage"));
    default:
      return state;
  }
};

export const getContactState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectIsSuccess = state => getContactState(state).get("isSuccess");

reducerRegistry.register(REDUCER_NAME, contactReducer);
