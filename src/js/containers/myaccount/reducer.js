import { fromJS } from "immutable";
import * as CONSTANTS from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  profile: {},
  isLoading: false,
  isError: false,
  transactionHistory: [],
  bonusTransactionHistory: [],
  playerBonusCampaignStatus: null,
  playerLinkedBonusCampaigns: null,
  historyPagination: { page: 1 },
  bonusPagination: { page: 1 }
});

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.PROFILE_LOADING:
      return state.set("isLoading", action.data);
    case CONSTANTS.PROFILE_ERROR:
      return state.set("isError", action.data);
    case CONSTANTS.SET_PROFILE:
      return state.set("profile", fromJS(action.data));
    case CONSTANTS.RESET_PROFILE:
      return state.set("profile", initialState.get("profile"));
    case CONSTANTS.TRANSACTION_HISTORY:
      return state.set("transactionHistory", fromJS(action.data));
    case CONSTANTS.SET_BONUS_TRANSACTION_HISTORY:
      return state.set("bonusTransactionHistory", fromJS(action.data));
    case CONSTANTS.SET_PLAYER_BONUS_CAMPAIGN_STATUS:
      return state.set("playerBonusCampaignStatus", fromJS(action.data));
    case CONSTANTS.RESET_PLAYER_BONUS_CAMPAIGN_STATUS:
      return state.set(
        "playerBonusCampaignStatus",
        initialState.get("playerBonusCampaignStatus")
      );
    case CONSTANTS.SET_PLAYER_LINKED_BONUS_CAMPAIGNS:
      return state.set("playerLinkedBonusCampaigns", fromJS(action.data));
    case CONSTANTS.RESET_PLAYER_LINKED_BONUS_CAMPAIGNS:
      return state.set(
        "playerLinkedBonusCampaigns",
        initialState.get("playerLinkedBonusCampaigns")
      );
    case CONSTANTS.SET_HISTORY_PAGINATION:
      return state.set("historyPagination", fromJS(action.data));
    case CONSTANTS.SET_BONUS_PAGINATION:
      return state.set("bonusPagination", fromJS(action.data));
    default:
      return state;
  }
};

export const getAccountState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectTransactionHistory = state =>
  getAccountState(state).get("transactionHistory");
export const selectBonusTransactionHistory = state =>
  getAccountState(state).get("bonusTransactionHistory");
export const selectProfile = state => getAccountState(state).get("profile");
export const selectIsLoading = state => getAccountState(state).get("isLoading");
export const selectIsError = state => getAccountState(state).get("isError");
export const selectPlayerBonusCampaignStatus = state =>
  getAccountState(state).get("playerBonusCampaignStatus");
export const selectplayerLinkedBonusCampaigns = state =>
  getAccountState(state).get("playerLinkedBonusCampaigns");
export const selectHistoryPagination = state =>
  getAccountState(state).get("historyPagination");
export const selectBonusPagination = state =>
  getAccountState(state).get("bonusPagination");

reducerRegistry.register(CONSTANTS.REDUCER_NAME, accountReducer);
