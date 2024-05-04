import { fromJS } from "immutable";

import {
  MATCHES_LOADING,
  MATCHES_ERROR,
  REDUCER_NAME,
  SET_PLAYER_MATCHES,
  SET_GAMER_TAGS,
  SET_XPPPOINTS,
  SET_PLAYERSTATS
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  matches: null,
  personalDetails: null,
  statistics: null,
  gamerTags: null,
  xpPoints: null,
  playerStats: null,
  stars: null,
  isLoading: false,
  isError: false
});

export const playerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCHES_LOADING:
      return state.set("isLoading", action.data);
    case MATCHES_ERROR:
      return state.set("isError", action.data);
    case SET_PLAYER_MATCHES:
      return state.set("matches", fromJS(action.data.matches));
    case SET_XPPPOINTS:
      return state
        .set("xpPoints", fromJS(action.data.xpPoints))
        .set("stars", fromJS(action.data.stars));
    case SET_PLAYERSTATS:
      return state.set("playerStats", fromJS(action.data));
    case SET_GAMER_TAGS:
      return state
        .set("gamerTags", fromJS(action.data.tags))
        .set("statistics", fromJS(action.data.statistics))
        .set("personalDetails", fromJS(action.data.details));
    default:
      return state;
  }
};

export const getPlayerDetailsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectMatches = state =>
  getPlayerDetailsState(state).get("matches");
export const selectPersonalDetails = state =>
  getPlayerDetailsState(state).get("personalDetails");
export const selectStatistics = state =>
  getPlayerDetailsState(state).get("statistics");
export const selectGamerTags = state =>
  getPlayerDetailsState(state).get("gamerTags");
export const selectXPPoints = state =>
  getPlayerDetailsState(state).get("xpPoints");
export const selectStars = state => getPlayerDetailsState(state).get("stars");
export const selectPlayerStats = state =>
  getPlayerDetailsState(state).get("playerStats");
export const selectIsLoading = state =>
  getPlayerDetailsState(state).get("isLoading");

reducerRegistry.register(REDUCER_NAME, playerDetailsReducer);
