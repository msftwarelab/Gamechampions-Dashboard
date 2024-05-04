import { fromJS } from "immutable";

import * as CONSTANTS from "./constants";

const initialState = fromJS({
  deferredPrompt: null,
  isLoading: true,
  isError: false,
  isBoundaryError: false,
  meta: {},
  title: "",
  url: "",
  auth: {
    token: null,
    refreshToken: null,
    role: null,
    profileId: null
  },
  isMobile: false,
  isIos: false,
  countries: [],
  brandConfig: {},
  reCaptchaResult: null
});

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.APP_LOADING:
      return state.set("isLoading", action.data);
    case CONSTANTS.APP_ERROR:
      return state.set("isError", true);
    case CONSTANTS.SET_BOUNDARY_ERROR:
      return state.set("isBoundaryError", action.data);
    case CONSTANTS.SET_DEFERRED_PROMPT:
      return state.set("deferredPrompt", action.data);
    case CONSTANTS.SET_META:
      return state.set("meta", fromJS(action.data));
    case CONSTANTS.SET_TITLE:
      return state.set("title", action.data);
    case CONSTANTS.SET_URL:
      return state.set("url", action.data);
    case CONSTANTS.SET_AUTHENTICATION:
      return state.set("auth", fromJS(action.data));
    case CONSTANTS.SET_IS_MOBILE:
      return state.set("isMobile", fromJS(action.data));
    case CONSTANTS.SET_IS_IOS:
      return state.set("isIos", fromJS(action.data));
    case CONSTANTS.RESET_AUTHENTICATION:
      return state.set("auth", initialState.get("auth"));
    case CONSTANTS.SET_COUNTRIES:
      return state.set("countries", action.data);
    case CONSTANTS.SET_BRAND_CONFIG:
      return state.set("brandConfig", fromJS(action.data));
    case CONSTANTS.SET_RECAPTCHA_RESULT:
      return state.set("reCaptchaResult", fromJS(action.data));
    default:
      return state;
  }
};

export const getAppState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectIsLoading = state => getAppState(state).get("isLoading");
export const selectIsError = state => getAppState(state).get("isError");
export const selectIsBoundaryError = state =>
  getAppState(state).get("isBoundaryError");
export const selectDeferredPrompt = state =>
  getAppState(state).get("deferredPrompt");
export const selectMeta = state => getAppState(state).get("meta");
export const selectTitle = state => getAppState(state).get("title");
export const selectUrl = state => getAppState(state).get("url");
export const selectAuth = state => getAppState(state).get("auth");
export const selectIsMobile = state => getAppState(state).get("isMobile");
export const selectIsIos = state => getAppState(state).get("isIos");
export const selectCountries = state => getAppState(state).get("countries");
export const selectBrandConfig = state => getAppState(state).get("brandConfig");
export const selectGlobalChatConfig = state =>
  selectBrandConfig(state).get("globalChat");
export const selectOnlinePlayersConfig = state =>
  selectBrandConfig(state).get("onlinePlayers");
export const selectTickerConfig = state =>
  selectBrandConfig(state).get("ticker");
export const selectGameLobbyConfig = state =>
  selectBrandConfig(state).get("gameLobby");
export const selectGameLobbyTabsConfig = state =>
  selectGameLobbyConfig(state).get("tabs");
export const selectRecaptchaResult = state =>
  getAppState(state).get("reCaptchaResult");
