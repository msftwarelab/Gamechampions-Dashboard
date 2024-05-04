import { fromJS } from "immutable";

import {
  SET_LOADING,
  SET_ERROR,
  SET_RECENT_PLAYERS,
  REDUCER_NAME
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  recentPlayers: [],
  game: null,
  isLoading: false,
  isError: false
});

export const recentPlayersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return state.set("isLoading", action.data);
    case SET_ERROR:
      return state.set("isError", action.data);
    case SET_RECENT_PLAYERS:
      return state.set("recentPlayers", fromJS(action.data));
    default:
      return state;
  }
};

export const getRecentPlayersState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectRecentPlayers = state =>
  getRecentPlayersState(state).get("recentPlayers");
export const selectIsLoading = state =>
  getRecentPlayersState(state).get("isLoading");

reducerRegistry.register(REDUCER_NAME, recentPlayersReducer);
