import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  BOY_GAME_LOBBY_ERROR,
  BOY_GAME_LOBBY_LOADING,
  SET_BOY_OUTCOMES,
  SET_UPLAY_GAMES,
  SET_UPLAY_QUICKLINKS,
  SET_HAS_PLAYER_RECEIVED_WELCOME_BONUS,
  SET_DASHBOARD_FOOTER,
  RESET_BOY_OUTCOMES
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  isLoading: false,
  error: null,
  boyOutcomes: null,
  uPlayGames: [],
  quickLinks: [],
  dashboardFooter: null,
  hasPlayerReceivedWelcomeBonus: null
});

export const boyGameLobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOY_GAME_LOBBY_LOADING:
      return state.set("isLoading", action.data);
    case BOY_GAME_LOBBY_ERROR:
      return state.set("error", action.data);
    case SET_BOY_OUTCOMES:
      return state.set("boyOutcomes", fromJS(action.data));
    case SET_UPLAY_GAMES:
      return state.set("uPlayGames", fromJS(action.data));
    case SET_UPLAY_QUICKLINKS:
      return state.set("quickLinks", fromJS(action.data));
    case SET_DASHBOARD_FOOTER:
      return state.set("dashboardFooter", fromJS(action.data));
    case SET_HAS_PLAYER_RECEIVED_WELCOME_BONUS:
      return state.set("hasPlayerReceivedWelcomeBonus", fromJS(action.data));
    case RESET_BOY_OUTCOMES:
      return state.set("boyOutcomes", initialState.get("boyOutcomes"));
    default:
      return state;
  }
};

export const getBoyGameLobbyState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectBoyOutcomes = state =>
  getBoyGameLobbyState(state).get("boyOutcomes");
export const selectIsLoading = state =>
  getBoyGameLobbyState(state).get("isLoading");
export const selectError = state => getBoyGameLobbyState(state).get("error");
export const selectUPlayGames = state =>
  getBoyGameLobbyState(state).get("uPlayGames");
export const selectUPlayQuickLinks = state =>
  getBoyGameLobbyState(state).get("quickLinks");
export const selectDashboardFooter = state =>
  getBoyGameLobbyState(state).get("dashboardFooter");
export const selectHasPlayerReceivedWelcomeBonus = state =>
  getBoyGameLobbyState(state).get("hasPlayerReceivedWelcomeBonus");

reducerRegistry.register(REDUCER_NAME, boyGameLobbyReducer);
