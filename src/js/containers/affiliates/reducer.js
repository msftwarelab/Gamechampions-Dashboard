import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  AFFILATES_LOADING,
  AFFILATES_ERROR,
  SET_ERROR,
  RESET_ERROR,
  REMOVE_AFFILATE,
  ADD_AFFILATE,
  SET_PAGINATION,
  SET_AFFILATES,
  SET_URLS,
  SET_SELECTED_AFFILATE,
  SET_SELECTED_AFFILATE_PLAYERS,
  SET_MEDIA,
  SET_COMMISSION,
  RESET_COMMISSION,
  RESET_AFFILIATE_PLAYERS,
  RESET_SELECTED_AFFILIATE,
  SET_SELECTED_AFFILIATE_URL,
  RESET_SELECTED_AFFILIATE_URL,
  UPDATE_URLS,
  SET_SELECTED_URL,
  SET_AFFILIATE_PROMOTIONS,
  SET_SELECTED_PROMOTION,
  RESET_SELECTED_PROMOTION,
  UPDATE_AFFILATE
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  affiliates: [],
  selectedAffiliate: null,
  selectedAffiliatePlayers: [],
  affiliatePromotions: [],
  selectedPromotion: null,
  media: [],
  urls: [],
  selectedUrl: null,
  isLoading: false,
  isError: false,
  error: "",
  pagination: { page: 1 },
  commission: {
    totalFilteredCommission: 0,
    totalCommission: 0,
    totalPayout: 0,
    totalDebt: 0
  }
});

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case AFFILATES_LOADING:
      return state.set("isLoading", action.data);
    case AFFILATES_ERROR:
      return state.set("isError", action.data);
    case SET_ERROR:
      return state.set("error", action.data);
    case RESET_ERROR:
      return state.set("error", initialState.get("error"));
    case SET_AFFILATES:
      return state.set("affiliates", fromJS(action.data));
    case REMOVE_AFFILATE:
      return state.set(
        "affiliates",
        state.get("affiliates").filter(n => n.get("id") !== action.data.id)
      );
    case ADD_AFFILATE:
      return state.set(
        "affiliates",
        state.get("affiliates").push(fromJS(action.data))
      );
    case UPDATE_AFFILATE:
      return state.set(
        "affiliates",
        state
          .get("affiliates")
          .map(item =>
            action.data.id === item.get("id") ? fromJS(action.data) : item
          )
      );
    case SET_SELECTED_AFFILATE:
      return state.set("selectedAffiliate", fromJS(action.data));
    case SET_COMMISSION:
      return state.set("commission", fromJS(action.data));
    case RESET_COMMISSION:
      return state.set("commission", initialState.get("commission"));
    case RESET_SELECTED_AFFILIATE:
      return state.set(
        "selectedAffiliate",
        initialState.get("selectedAffiliate")
      );
    case RESET_AFFILIATE_PLAYERS:
      return state.set(
        "selectedAffiliatePlayers",
        initialState.get("selectedAffiliatePlayers")
      );
    case SET_SELECTED_AFFILATE_PLAYERS:
      return state.set("selectedAffiliatePlayers", fromJS(action.data));
    case SET_URLS:
      return state.set("urls", fromJS(action.data));
    case SET_SELECTED_AFFILIATE_URL:
      return state.set("selectedUrl", fromJS(action.data));
    case RESET_SELECTED_AFFILIATE_URL:
      return state.set("selectedUrl", initialState.get("selectedUrl"));
    case UPDATE_URLS:
      return state.set(
        "urls",
        state
          .get("urls")
          .map(item =>
            action.data.id === item.get("id") ? fromJS(action.data) : item
          )
      );
    case SET_SELECTED_URL:
      return state.set("selectedUrl", fromJS(action.data));
    case SET_MEDIA:
      return state.set("media", fromJS(action.data));
    case SET_AFFILIATE_PROMOTIONS:
      return state.set("affiliatePromotions", fromJS(action.data));
    case SET_SELECTED_PROMOTION:
      return state.set("selectedPromotion", fromJS(action.data));
    case RESET_SELECTED_PROMOTION:
      return state.set(
        "selectedPromotion",
        initialState.get("selectedPromotion")
      );
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    default:
      return state;
  }
};

export const getAffiliatesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectAffiliates = state =>
  getAffiliatesState(state).get("affiliates");
export const selectIsLoading = state =>
  getAffiliatesState(state).get("isLoading");
export const selectPagination = state =>
  getAffiliatesState(state).get("pagination");
export const selectUrls = state => getAffiliatesState(state).get("urls");
export const selectSelectedAffiliate = state =>
  getAffiliatesState(state).get("selectedAffiliate");
export const selectSelectedAffiliatePlayers = state =>
  getAffiliatesState(state).get("selectedAffiliatePlayers");
export const selectMedia = state => getAffiliatesState(state).get("media");
export const selectCommission = state =>
  getAffiliatesState(state).get("commission");
export const selectSelectedAffiliateUrl = state =>
  getAffiliatesState(state).get("selectedUrl");
export const selectSelectedUrl = state =>
  getAffiliatesState(state).get("selectedUrl");
export const selectError = state => getAffiliatesState(state).get("error");
export const selectAffiliatePromotions = state =>
  getAffiliatesState(state).get("affiliatePromotions");
export const selectedAffiliatePromotion = state =>
  getAffiliatesState(state).get("selectedPromotion");

reducerRegistry.register(REDUCER_NAME, gamesReducer);
