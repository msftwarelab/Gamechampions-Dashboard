import { fromJS } from "immutable";
import {
  REDUCER_NAME,
  GAMES_ERROR,
  GAMES_LOADING,
  GAMES_RESET_ERROR
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  isLoading: false,
  error: null
});

export const addChallenges = (state = initialState, action) => {
  switch (action.type) {
    case GAMES_RESET_ERROR:
      return state.set("error", initialState.get("error"));
    case GAMES_ERROR:
      return state.set("error", action.data);
    case GAMES_LOADING:
      return state.set("isLoading", action.data);
    default:
      return state;
  }
};

export const getCreateChallenge = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectIsLoading = state =>
  getCreateChallenge(state).get("isLoading");
export const selectError = state => getCreateChallenge(state).get("error");

reducerRegistry.register(REDUCER_NAME, addChallenges);
