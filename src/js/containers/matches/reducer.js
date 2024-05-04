import { fromJS } from "immutable";

import {
  MATCHES_LOADING,
  MATCHES_ERROR,
  REDUCER_NAME,
  SET_MATCHES,
  SET_BOY_MATCHES,
  SET_TOURNAMENT_HISTORICAL_MATCHES
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  matches: null,
  boyMatches: null,
  isLoading: false,
  isError: false,
  tournamentHistoricalMatches: null
});

export const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCHES_LOADING:
      return state.set("isLoading", action.data);
    case MATCHES_ERROR:
      return state.set("isError", action.data);
    case SET_MATCHES:
      return state.set("matches", fromJS(action.data));
    case SET_BOY_MATCHES:
      return state.set("boyMatches", fromJS(action.data));
    case SET_TOURNAMENT_HISTORICAL_MATCHES:
      return state.set("tournamentHistoricalMatches", fromJS(action.data));
    default:
      return state;
  }
};

export const getMatchesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectMatches = state => getMatchesState(state).get("matches");
export const selectBoyMatches = state =>
  getMatchesState(state).get("boyMatches");
export const selectIsLoading = state => getMatchesState(state).get("isLoading");
export const selectTournamentHistoricalMatches = state =>
  getMatchesState(state).get("tournamentHistoricalMatches");

reducerRegistry.register(REDUCER_NAME, matchesReducer);
