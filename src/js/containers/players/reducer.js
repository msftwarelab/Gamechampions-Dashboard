import { fromJS } from "immutable";

import {
  PLAYERS_LOADING,
  PLAYERS_ERROR,
  REDUCER_NAME,
  SET_PLAYERS,
  SET_PAGINATION,
  SET_SELECTED_PLAYER,
  RESET_SELECTED_PLAYER,
  SET_SELECTED_PLAYER_BALANCE,
  SET_TRANSACTIONS,
  SET_TRANSACTIONS_PAGINATION,
  TRANSACTIONS_LOADING,
  SET_MATCHES,
  SET_MATCHES_PAGINATION,
  MATCHES_LOADING,
  UPDATE_TRANSACTION,
  UPDATE_PLAYER,
  SET_PLAYER_XP_POINTS,
  UPDATE_MATCH,
  SET_SELECTED_MATCH,
  CANCELL_MATCH_LOADING,
  SET_ACTIVE_TOURNAMENTS,
  SET_PLAYER_BOY_PROFILE
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  players: [],
  transactions: [],
  matches: [],
  selectedMatch: null,
  isLoading: false,
  isCancelMatchLoading: false,
  transactionsLoading: false,
  matchesLoading: false,
  isError: false,
  pagination: { page: 1 },
  transactionPagination: { page: 1 },
  matchPagination: { page: 1 },
  selectedPlayer: null,
  selectedPlayerBalance: {
    accountBalance: 0,
    availableAmount: 0
  },
  xpPoints: 0,
  activeTournaments: [],
  boyProfile: null
});

export const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAYERS_LOADING:
      return state.set("isLoading", action.data);
    case CANCELL_MATCH_LOADING:
      return state.set("isCancelMatchLoading", action.data);
    case TRANSACTIONS_LOADING:
      return state.set("transactionsLoading", action.data);
    case MATCHES_LOADING:
      return state.set("matchesLoading", action.data);
    case PLAYERS_ERROR:
      return state.set("isError", action.data);
    case UPDATE_TRANSACTION:
      return state.setIn(
        [
          "transactions",
          state
            .get("transactions")
            .findIndex(item => item.get("id") === action.data.id)
        ],
        action.data
      );
    case UPDATE_PLAYER:
      return state.set(
        "players",
        state
          .get("players")
          .map(item =>
            action.data.id === item.get("id") ? fromJS(action.data) : item
          )
      );
    case SET_PLAYERS:
      return state.set("players", fromJS(action.data));
    case SET_TRANSACTIONS:
      return state.set("transactions", fromJS(action.data));
    case SET_MATCHES:
      return state.set("matches", fromJS(action.data));
    case SET_SELECTED_MATCH:
      return state.set("selectedMatch", fromJS(action.data));
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    case SET_TRANSACTIONS_PAGINATION:
      return state.set("transactionPagination", fromJS(action.data));
    case SET_MATCHES_PAGINATION:
      return state.set("matchPagination", fromJS(action.data));
    case SET_SELECTED_PLAYER:
      return state.set("selectedPlayer", fromJS(action.data));
    case SET_SELECTED_PLAYER_BALANCE:
      return state.set("selectedPlayerBalance", fromJS(action.data));
    case RESET_SELECTED_PLAYER:
      return state
        .set("selectedPlayer", initialState.get("selectedPlayer"))
        .set(
          "selectedPlayerBalance",
          initialState.get("selectedPlayerBalance")
        );
    case SET_PLAYER_XP_POINTS:
      return state.set("xpPoints", fromJS(action.data.xpPoints));
    case SET_ACTIVE_TOURNAMENTS:
      return state.set("activeTournaments", fromJS(action.data));
    case UPDATE_MATCH:
      return state.set(
        "matches",
        state
          .get("matches")
          .map(item =>
            action.data.id === item.get("id") ? fromJS(action.data) : item
          )
      );
    case SET_PLAYER_BOY_PROFILE:
      return state.set("boyProfile", fromJS(action.data));
    default:
      return state;
  }
};

export const getPlayersState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectPlayers = state => getPlayersState(state).get("players");
export const selectIsLoading = state => getPlayersState(state).get("isLoading");
export const selectCancelMatchLoading = state =>
  getPlayersState(state).get("isCancelMatchLoading");
export const selectPagination = state =>
  getPlayersState(state).get("pagination");
export const selectSelectedPlayer = state =>
  getPlayersState(state).get("selectedPlayer");
export const selectSelectedPlayerBalance = state =>
  getPlayersState(state).get("selectedPlayerBalance");
export const selectTransactions = state =>
  getPlayersState(state).get("transactions");
export const selectTransactionPagination = state =>
  getPlayersState(state).get("transactionPagination");
export const selectTransactionsLoading = state =>
  getPlayersState(state).get("transactionsLoading");
export const selectMatches = state => getPlayersState(state).get("matches");
export const selectMatchPagination = state =>
  getPlayersState(state).get("matchPagination");
export const selectMatchesLoading = state =>
  getPlayersState(state).get("matchesLoading");
export const selectXpPoints = state => getPlayersState(state).get("xpPoints");
export const selectSelectedMatch = state =>
  getPlayersState(state).get("selectedMatch");
export const selectActiveTournaments = state =>
  getPlayersState(state).get("activeTournaments");
export const selectBoyProfile = state =>
  getPlayersState(state).get("boyProfile");
reducerRegistry.register(REDUCER_NAME, playersReducer);
