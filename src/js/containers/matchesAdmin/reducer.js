import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  SET_PAGINATION,
  MATCHES_LOADING,
  MATCHES_ERROR,
  SET_MATCHES,
  UPDATE_MATCH
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  matches: [],
  isLoading: false,
  isError: false,
  pagination: { page: 1 }
});

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCHES_LOADING:
      return state.set("isLoading", action.data);
    case MATCHES_ERROR:
      return state.set("isError", action.data);
    case SET_MATCHES:
      return state.set("matches", fromJS(action.data));
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    case UPDATE_MATCH:
      return state.set(
        "matches",
        state
          .get("matches")
          .map(item =>
            action.data.id === item.get("id")
              ? fromJS({ ...item.toJS(), ...action.data })
              : item
          )
      );
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
export const selectIsLoading = state => getMatchesState(state).get("isLoading");
export const selectPagination = state =>
  getMatchesState(state).get("pagination");

reducerRegistry.register(REDUCER_NAME, gamesReducer);
