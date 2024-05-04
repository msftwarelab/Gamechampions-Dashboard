import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  LEADER_BOARDS_LOADING,
  LEADER_BOARDS_ERROR,
  SET_LEADER_BOARDS,
  SET_GAME_ID
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  leaderBoards: [],
  leaderBoardsBanner: null,
  isLoading: false,
  isError: false,
  gameId: null
});

export const leaderBoardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEADER_BOARDS_LOADING:
      return state.set("isLoading", action.data);
    case LEADER_BOARDS_ERROR:
      return state.set("isError", action.data);
    case SET_LEADER_BOARDS:
      return state.set("leaderBoards", fromJS(action.data));
    case SET_GAME_ID:
      return state.set("gameId", fromJS(action.data.gameId));
    default:
      return state;
  }
};

export const getLeaderBoardsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectLeaderBoards = state =>
  getLeaderBoardsState(state).get("leaderBoards");
export const selectIsLoading = state =>
  getLeaderBoardsState(state).get("isLoading");
export const selectGameId = state => getLeaderBoardsState(state).get("gameId");

reducerRegistry.register(REDUCER_NAME, leaderBoardsReducer);
