import { fromJS } from "immutable";

import {
  INSTANT_MATCHES_LOADING,
  INSTANT_MATCHES_ERROR,
  SET_INSTANT_MATCHES,
  REDUCER_NAME,
  SET_GAME,
  RESET_GAME
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  instantMatches: [],
  game: null,
  isLoading: false,
  isError: false
});

export const matchMakingReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSTANT_MATCHES_LOADING:
      return state.set("isLoading", action.data);
    case INSTANT_MATCHES_ERROR:
      return state.set("isError", action.data);
    case SET_INSTANT_MATCHES:
      return state.set("instantMatches", fromJS(action.data));
    case SET_GAME:
      return state.set("game", fromJS(action.data));
    case RESET_GAME:
      return state.set("game", initialState.game);
    default:
      return state;
  }
};

export const getMatchMakingState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectInstantMatches = state =>
  getMatchMakingState(state).get("instantMatches");
export const selectGame = state => getMatchMakingState(state).get("game");
export const selectIsLoading = state =>
  getMatchMakingState(state).get("isLoading");

reducerRegistry.register(REDUCER_NAME, matchMakingReducer);
