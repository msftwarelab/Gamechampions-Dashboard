import { fromJS } from "immutable";

import { REDUCER_NAME, SET_START_TIME } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  timerStart: 0
});

export const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_START_TIME:
      return state.set("timerStart", action.data);
    default:
      return state;
  }
};

export const startTime = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectStartTime = state => startTime(state).get("timerStart");

reducerRegistry.register(REDUCER_NAME, timerReducer);
