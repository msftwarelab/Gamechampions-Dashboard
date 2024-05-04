import { fromJS } from "immutable";
import * as CONSTANTS from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  commission: "",
  minimunAmountCommission: "",
  bonusMoney: "",
  availableAmount: 0,
  inPlayBalance: 0,
  depositCount: null,
  isLoading: false,
  isError: false
});

export const accountBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.WALLET_LOADING:
      return state.set("isLoading", action.data);
    case CONSTANTS.WALLET_ERROR:
      return state.set("isError", action.data);
    case CONSTANTS.BONUS_MONEY:
      return state.set("bonusMoney", fromJS(action.data));
    case CONSTANTS.AVAILABLE_AMOUNT:
      return state.set("availableAmount", fromJS(action.data));
    case CONSTANTS.INPLAY_BALANCE:
      return state.set("inPlayBalance", fromJS(action.data));
    case CONSTANTS.DEPOSIT_COUNT:
      return state.set("depositCount", fromJS(action.data));
    case CONSTANTS.COMMISSION:
      return state
        .set("commission", fromJS(action.data.commission))
        .set(
          "minimunAmountCommission",
          fromJS(action.data.minimunAmountCommission)
        );
    default:
      return state;
  }
};

export const getAccountBalanceState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectBonusMoney = state =>
  getAccountBalanceState(state).get("bonusMoney");
export const selectAvailableAmount = state =>
  getAccountBalanceState(state).get("availableAmount");
export const selectInplayBalance = state =>
  getAccountBalanceState(state).get("inPlayBalance");
export const selectDepositCount = state =>
  getAccountBalanceState(state).get("depositCount");
export const selectIsLoading = state =>
  getAccountBalanceState(state).get("isLoading");
export const selectIsError = state =>
  getAccountBalanceState(state).get("isError");
export const selectCommission = state =>
  getAccountBalanceState(state).get("commission");
export const selectMinimunAmountCommission = state =>
  getAccountBalanceState(state).get("minimunAmountCommission");

reducerRegistry.register(CONSTANTS.REDUCER_NAME, accountBalanceReducer);
