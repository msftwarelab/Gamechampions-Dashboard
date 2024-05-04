import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  SET_REFERRAL_LINK,
  RESET_REFERRAL_LINK,
  SET_ERROR,
  RESET_ERROR,
  SET_LOADING
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  referralLink: null,
  isLoading: false,
  error: null
});

export const playerReferralReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REFERRAL_LINK:
      return state.set("referralLink", fromJS(action.data));
    case RESET_REFERRAL_LINK:
      return state.set("referralLink", initialState.get("referralLink"));
    case SET_ERROR:
      return state.set("error", action.data);
    case RESET_ERROR:
      return state.set("error", initialState.get("error"));
    case SET_LOADING:
      return state.set("isLoading", action.data);
    default:
      return state;
  }
};

export const getPlayerReferralState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectIsLoading = state =>
  getPlayerReferralState(state).get("isLoading");
export const selectError = state => getPlayerReferralState(state).get("error");
export const selectReferralLink = state =>
  getPlayerReferralState(state).get("referralLink");

reducerRegistry.register(REDUCER_NAME, playerReferralReducer);
