import { fromJS } from "immutable";

import {
  MATCH_LOADING,
  MATCH_ERROR,
  SET_MATCH,
  SET_TEAMS,
  REDUCER_NAME,
  SET_MATCH_STATUS,
  SET_CHALLENGEE_XPPOINTS,
  SET_CHALLENGER_XPPOINTS,
  SET_ERROR,
  RESET_ERROR
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  match: null,
  matchStatus: null,
  isLoading: false,
  isError: false,
  challengerXPPoints: null,
  challengeeXPPoints: null,
  challengerStars: null,
  challengeeStars: null,
  teams: null,
  error: null
});

export const matchLobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCH_LOADING:
      return state.set("isLoading", action.data);
    case MATCH_ERROR:
      return state.set("isError", action.data);
    case SET_ERROR:
      return state.set("error", action.data);
    case RESET_ERROR:
      return state.set("error", initialState.get("error"));
    case SET_MATCH:
      return state.set("match", fromJS(action.data));
    case SET_TEAMS:
      return state.set("teams", fromJS(action.data));
    case SET_MATCH_STATUS:
      return state.set("matchStatus", fromJS(action.data));
    case SET_CHALLENGER_XPPOINTS:
      return state
        .set("challengerXPPoints", fromJS(action.data.xpPoints))
        .set("challengerStars", fromJS(action.data.stars));
    case SET_CHALLENGEE_XPPOINTS:
      return state
        .set("challengeeXPPoints", fromJS(action.data.xpPoints))
        .set("challengeeStars", fromJS(action.data.stars));
    default:
      return state;
  }
};

export const getMatchLobbyState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectError = state => getMatchLobbyState(state).get("error");
export const selectMatch = state => getMatchLobbyState(state).get("match");
export const selectTeams = state => getMatchLobbyState(state).get("teams");
export const selectMatchStatus = state =>
  getMatchLobbyState(state).get("matchStatus");
export const selectIsLoading = state =>
  getMatchLobbyState(state).get("isLoading");
export const selectChallengerXPPoints = state =>
  getMatchLobbyState(state).get("challengerXPPoints");
export const selectChallengeeXPPoints = state =>
  getMatchLobbyState(state).get("challengeeXPPoints");
export const selectChallengerStars = state =>
  getMatchLobbyState(state).get("challengerStars");
export const selectChallengeeStars = state =>
  getMatchLobbyState(state).get("challengeeStars");

reducerRegistry.register(REDUCER_NAME, matchLobbyReducer);
