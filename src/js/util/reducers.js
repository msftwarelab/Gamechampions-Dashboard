/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from "redux-immutable";

// global reducers
import { appReducer } from "../containers/app/reducer";
import { routesReducer } from "../containers/routes/reducer";
import reducerRegistry from "./reducerRegistry";

// Preserve initial state for not-yet-loaded reducers
const getDynamicReducers = (reducers, initialState) => {
  const reducerNames = Object.keys(reducers);
  const staticReducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (
      reducerNames.indexOf(item) === -1 &&
      staticReducerNames.indexOf(item) !== -1
    ) {
      reducers[item] = (state = null) => state;
    }
  });
  return reducers;
};

// default reducers available by default
const staticReducers = {
  app: appReducer,
  routes: routesReducer
};

export default function createReducer({ reducers, initialState }) {
  const dynamicReducers = getDynamicReducers(
    reducers || reducerRegistry.getReducers(),
    initialState
  );

  return combineReducers({
    ...staticReducers,
    ...dynamicReducers
  });
}
