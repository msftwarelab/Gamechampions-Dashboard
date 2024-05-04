import { fromJS } from "immutable";
import {
  REDUCER_NAME,
  MATCH_LOBBY_ERROR,
  MATCH_LOBBY_LOADING,
  RECOMMENDED_SCORE_ADVANTAGE,
  CHALLENGEE_DETAILS,
  CHALLENGER_DETAILS,
  SCORE_ADVANTAGE,
  MATCH_PLATFORM,
  DEFENDER_TEAM,
  CHALLENGER_TEAM
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  challengee: {},
  challenger: {},
  defenderTeam: null,
  challengerTeam: null,
  recommendedScoreAdvantage: {},
  scoreAdvantage: {},
  isLoading: false,
  isError: false
});

export const setScoreAdvantage = (state = initialState, action) => {
  switch (action.type) {
    case CHALLENGEE_DETAILS:
      return state.set("challengee", fromJS(action.data));
    case CHALLENGER_DETAILS:
      return state.set("challenger", fromJS(action.data));
    case DEFENDER_TEAM:
      return state.set("defenderTeam", fromJS(action.data));
    case CHALLENGER_TEAM:
      return state.set("challengerTeam", fromJS(action.data));
    case RECOMMENDED_SCORE_ADVANTAGE:
      return state.set("recommendedScoreAdvantage", fromJS(action.data));
    case SCORE_ADVANTAGE:
      return state.set("scoreAdvantage", fromJS(action.data));
    case MATCH_PLATFORM:
      return state.set("platform", action.data);
    case MATCH_LOBBY_ERROR:
      return state.set("isError", action.data);
    case MATCH_LOBBY_LOADING:
      return state.set("isLoading", action.data);
    default:
      return state;
  }
};

export const getSetScoreAdvantage = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectChallengee = state =>
  getSetScoreAdvantage(state).get("challengee");
export const selectChallenger = state =>
  getSetScoreAdvantage(state).get("challenger");
export const selectDefenderTeam = state =>
  getSetScoreAdvantage(state).get("defenderTeam");
export const selectChallengerTeam = state =>
  getSetScoreAdvantage(state).get("challengerTeam");
export const selectRecommendedScoreAdvantage = state =>
  getSetScoreAdvantage(state).get("recommendedScoreAdvantage");
export const selectScoreAdvantage = state =>
  getSetScoreAdvantage(state).get("scoreAdvantage");
export const selectPlatform = state =>
  getSetScoreAdvantage(state).get("platform");
export const selectIsLoading = state =>
  getSetScoreAdvantage(state).get("isLoading");
export const selectIsError = state =>
  getSetScoreAdvantage(state).get("isError");

reducerRegistry.register(REDUCER_NAME, setScoreAdvantage);
