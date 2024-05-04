import { fromJS } from "immutable";

import { SET_GAME_TICKER_MATCHES, REDUCER_NAME, SET_GAME } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  tickerMatches: [],
  game: null
});

export const gameLobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_TICKER_MATCHES:
      return state.set("tickerMatches", fromJS(action.data));
    case SET_GAME:
      return state.set("game", fromJS(action.data));
    default:
      return state;
  }
};

export const getGameLobbyState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectTickerMatches = state =>
  getGameLobbyState(state).get("tickerMatches");

export const selectGame = state => getGameLobbyState(state).get("game");
export const selectGameTickerMatches = state =>
  getGameLobbyState(state).get("tickerMatches");

reducerRegistry.register(REDUCER_NAME, gameLobbyReducer);
