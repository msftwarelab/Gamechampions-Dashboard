import { fromJS } from "immutable";

import {
  GAMES_LOADING,
  GAMES_ERROR,
  REDUCER_NAME,
  SET_GAMES,
  SET_PAGINATION,
  REMOVE_GAME,
  ADD_GAME
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  games: [],
  isLoading: false,
  isError: false,
  pagination: { page: 1 }
});

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAMES_LOADING:
      return state.set("isLoading", action.data);
    case GAMES_ERROR:
      return state.set("isError", action.data);
    case SET_GAMES:
      return state.set("games", fromJS(action.data));
    case REMOVE_GAME:
      return state.set(
        "games",
        state.get("games").filter(n => n.get("id") !== action.data.id)
      );
    case ADD_GAME:
      return state.set("games", state.get("games").push(fromJS(action.data)));
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    default:
      return state;
  }
};

export const getGamesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectGames = state => getGamesState(state).get("games");
export const selectIsLoading = state => getGamesState(state).get("isLoading");
export const selectPagination = state => getGamesState(state).get("pagination");

reducerRegistry.register(REDUCER_NAME, gamesReducer);
