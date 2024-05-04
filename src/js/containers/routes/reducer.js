import { fromJS } from "immutable";

import * as CONSTANTS from "./constants";

const initialState = fromJS({
  routes: [],
  goMaps: [],
  isLoading: false,
  isError: false
});

export const routesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_ROUTES:
      return state.set("routes", fromJS(action.data));
    case CONSTANTS.SET_GO_MAPS:
      return state.set("goMaps", fromJS(action.data));
    default:
      return state;
  }
};

export const getRoutesState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectRoutes = state => getRoutesState(state).get("routes");
export const selectGoMaps = state => getRoutesState(state).get("goMaps");
