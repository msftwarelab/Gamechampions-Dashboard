import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  LOADING,
  ERROR,
  SET_ERROR,
  RESET_ERROR,
  SET_PAGINATION,
  SET_DUPLICATE_IP_PLAYERS,
  SET_ADMIN_FILTER_FROM,
  SET_ADMIN_FILTER_TO,
  SET_DUPLICATE_IP_PLAYERS_DETAIL,
  SET_DETAIL_PAGINATION
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  duplicateIpPlayers: [],
  isLoading: false,
  isError: false,
  error: "",
  pagination: { page: 1 },
  filterFrom: null,
  filterTo: null,
  duplicateIpPlayersDetail: [],
  detailPagination: { page: 1 }
});

export const ipsReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return state.set("isLoading", action.data);
    case ERROR:
      return state.set("isError", action.data);
    case SET_ERROR:
      return state.set("error", action.data);
    case RESET_ERROR:
      return state.set("error", initialState.get("error"));
    case SET_DUPLICATE_IP_PLAYERS:
      return state.set("duplicateIpPlayers", fromJS(action.data));
    case SET_DUPLICATE_IP_PLAYERS_DETAIL:
      return state.set("duplicateIpPlayersDetail", fromJS(action.data));
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    case SET_DETAIL_PAGINATION:
      return state.set("detailPagination", fromJS(action.data));
    case SET_ADMIN_FILTER_FROM:
      return state.set("filterFrom", fromJS(action.data));
    case SET_ADMIN_FILTER_TO:
      return state.set("filterTo", fromJS(action.data));
    default:
      return state;
  }
};

export const getDuplicateIpsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectDuplicateIpPlayers = state =>
  getDuplicateIpsState(state).get("duplicateIpPlayers");
export const selectDuplicateIpPlayersDetail = state =>
  getDuplicateIpsState(state).get("duplicateIpPlayersDetail");
export const selectFilterFrom = state =>
  getDuplicateIpsState(state).get("filterFrom");
export const selectFilterTo = state =>
  getDuplicateIpsState(state).get("filterTo");
export const selectIsLoading = state =>
  getDuplicateIpsState(state).get("isLoading");
export const selectPagination = state =>
  getDuplicateIpsState(state).get("pagination");
export const selectDetailPagination = state =>
  getDuplicateIpsState(state).get("detailPagination");
export const selectError = state => getDuplicateIpsState(state).get("error");

reducerRegistry.register(REDUCER_NAME, ipsReportReducer);
