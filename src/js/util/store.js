/**
 * Create the store with dynamic reducers
 * Based on: https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
 */

import { createStore, applyMiddleware } from "redux";
import { fromJS } from "immutable";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import createReducer from "./reducers";
import reducerRegistry from "./reducerRegistry";

export function configureStore(initialState = {}) {
  let store = createStore(
    createReducer({ initialState }),
    fromJS(initialState),
    composeWithDevTools(applyMiddleware(thunk))
  );

  // replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(createReducer({ reducers }));
  });

  return store;
}
