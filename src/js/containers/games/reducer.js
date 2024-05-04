import { fromJS } from "immutable";

import {
  GAMES_LOADING,
  GAMES_ERROR,
  REDUCER_NAME,
  SET_GAMES,
  SET_PAGINATION,
  REMOVE_GAME,
  ADD_GAME,
  SET_ADMIN_FILTER_FROM,
  SET_ADMIN_FILTER_TO,
  SET_INSTANT_MATCHES,
  SET_MESSAGES_SENT,
  SET_PLAYER_DEPOSITS,
  SET_PLAYER_REGISTRATIONS,
  SET_MATCHES_PLAYED,
  SET_PLAYER_WINS,
  SET_ACTIVE_PLAYERS,
  SET_DEPOSIT_SUM,
  SET_DEPOSIT_COUNT,
  SET_REGISTERED_PLAYER_COUNT,
  SET_MATCH_COMMISSIONS,
  SET_MATCH_PRIZES,
  SET_TOURNAMENT,
  SET_TOURNAMENT_POINTS_TABLE,
  SET_ROTATING_BANNERS
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  games: [],
  isLoading: false,
  isError: false,
  pagination: { page: 1 },
  filterFrom: null,
  filterTo: null,
  instantMatches: {},
  messageSent: {},
  playerDeposits: {},
  playerRegistrations: {},
  matchesPlayed: {},
  playerWins: {},
  matchCommissions: {},
  matchPrizes: {},
  activePlayers: 0,
  depositCount: 0,
  depositSum: 0,
  playerCount: 0,
  tournament: {},
  tournamentPointsTable: [],
  rotatingBanners: []
});

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INSTANT_MATCHES:
      return state.set("instantMatches", fromJS(action.data));
    case SET_MESSAGES_SENT:
      return state.set("messageSent", fromJS(action.data));
    case SET_PLAYER_DEPOSITS:
      return state.set("playerDeposits", fromJS(action.data));
    case SET_MATCH_COMMISSIONS:
      return state.set("matchCommissions", fromJS(action.data));
    case SET_MATCH_PRIZES:
      return state.set("matchPrizes", fromJS(action.data));
    case SET_PLAYER_REGISTRATIONS:
      return state.set("playerRegistrations", fromJS(action.data));
    case SET_MATCHES_PLAYED:
      return state.set("matchesPlayed", fromJS(action.data));
    case SET_PLAYER_WINS:
      return state.set("playerWins", fromJS(action.data));
    case SET_ACTIVE_PLAYERS:
      return state.set("activePlayers", fromJS(action.data));
    case SET_DEPOSIT_COUNT:
      return state.set("depositCount", fromJS(action.data));
    case SET_DEPOSIT_SUM:
      return state.set("depositSum", fromJS(action.data));
    case SET_REGISTERED_PLAYER_COUNT:
      return state.set("playerCount", fromJS(action.data));
    case GAMES_LOADING:
      return state.set("isLoading", action.data);
    case GAMES_ERROR:
      return state.set("isError", action.data);
    case SET_GAMES:
      return state.set("games", fromJS(action.data));
    case SET_TOURNAMENT:
      return state.set("tournament", fromJS(action.data));
    case SET_TOURNAMENT_POINTS_TABLE:
      return state.set("tournamentPointsTable", fromJS(action.data));
    case SET_ROTATING_BANNERS:
      return state.set("rotatingBanners", fromJS(action.data));
    case SET_ADMIN_FILTER_FROM:
      return state.set("filterFrom", fromJS(action.data));
    case SET_ADMIN_FILTER_TO:
      return state.set("filterTo", fromJS(action.data));
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
export const selectFilterFrom = state => getGamesState(state).get("filterFrom");
export const selectFilterTo = state => getGamesState(state).get("filterTo");

export const selectInstantMatches = state =>
  getGamesState(state).get("instantMatches");
export const selectMessageSent = state =>
  getGamesState(state).get("messageSent");
export const selectPlayerDeposits = state =>
  getGamesState(state).get("playerDeposits");
export const selectPlayerRegistrations = state =>
  getGamesState(state).get("playerRegistrations");
export const selectMatchesPlayed = state =>
  getGamesState(state).get("matchesPlayed");
export const selectPlayerWins = state => getGamesState(state).get("playerWins");
export const selectActivePlayers = state =>
  getGamesState(state).get("activePlayers");
export const selectDepositCount = state =>
  getGamesState(state).get("depositCount");
export const selectDepositSum = state => getGamesState(state).get("depositSum");
export const selectPlayerCount = state =>
  getGamesState(state).get("playerCount");
export const selectMatchCommissions = state =>
  getGamesState(state).get("matchCommissions");
export const selectMatchPrizes = state =>
  getGamesState(state).get("matchPrizes");
export const selectTournament = state => getGamesState(state).get("tournament");
export const selectTournamentPointsTable = state =>
  getGamesState(state).get("tournamentPointsTable");
export const selectRotatingBanners = state =>
  getGamesState(state).get("rotatingBanners");

reducerRegistry.register(REDUCER_NAME, gamesReducer);
