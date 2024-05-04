import { fromJS } from "immutable";

import {
  GAME_RULES_LOADING,
  GAME_RULES_ERROR,
  REDUCER_NAME
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  gameRules: null,
  isLoading: false,
  isError: false
});

export const gameRulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_RULES_LOADING:
      return state.set("isLoading", action.data);
    case GAME_RULES_ERROR:
      return state.set("isError", action.data);
    default:
      return state;
  }
};

export const getGameRulesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectIsLoading = state =>
  getGameRulesState(state).get("isLoading");

reducerRegistry.register(REDUCER_NAME, gameRulesReducer);
