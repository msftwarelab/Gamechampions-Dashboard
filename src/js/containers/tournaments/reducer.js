import { fromJS } from "immutable";

import {
  SET_LOADING,
  SET_ERROR,
  SET_TOURNAMENT_RANKING,
  REDUCER_NAME,
  RESET_TOURNAMENT_RANKING,
  RESET_ERROR,
  SET_TOURNAMENT,
  RESET_TOURNAMENT,
  SET_TOURNAMENTS_LIST
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  tournamentRanking: [],
  game: null,
  isLoading: false,
  error: "",
  tournament: null,
  tournamentsList: null
});

export const tournamentRankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return state.set("isLoading", action.data);
    case SET_ERROR:
      return state.set("error", action.data);
    case RESET_ERROR:
      return state.set("error", initialState.get("error"));
    case SET_TOURNAMENT_RANKING:
      return state.set("tournamentRanking", fromJS(action.data));
    case SET_TOURNAMENT:
      return state.set("tournament", fromJS(action.data));
    case RESET_TOURNAMENT_RANKING:
      return state.set(
        "tournamentRanking",
        initialState.get("tournamentRanking")
      );
    case RESET_TOURNAMENT:
      return state.set("tournament", initialState.get("tournament"));
    case SET_TOURNAMENTS_LIST:
      return state.set("tournamentsList", fromJS(action.data));
    default:
      return state;
  }
};

export const getTournamentsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectTournamentRanking = state =>
  getTournamentsState(state).get("tournamentRanking");
export const selectTournament = state =>
  getTournamentsState(state).get("tournament");
export const selectIsLoading = state =>
  getTournamentsState(state).get("isLoading");
export const selectError = state => getTournamentsState(state).get("error");
export const selectTournamentsList = state =>
  getTournamentsState(state).get("tournamentsList");

reducerRegistry.register(REDUCER_NAME, tournamentRankingReducer);
