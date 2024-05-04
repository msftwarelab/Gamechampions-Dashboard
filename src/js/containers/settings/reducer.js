import { fromJS } from "immutable";

import * as CONSTANTS from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  isPushEnabled: false
});

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_PUSH_ENABLED:
      return state.set("isPushEnabled", action.data);
    default:
      return state;
  }
};

export const getSettingsState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectIsPushEnabled = state =>
  getSettingsState(state).get("isPushEnabled");

reducerRegistry.register(CONSTANTS.REDUCER_NAME, settingsReducer);
