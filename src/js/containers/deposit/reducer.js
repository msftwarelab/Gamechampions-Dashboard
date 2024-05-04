import { fromJS } from "immutable";
import {
  SET_AMOUNT,
  SET_CARD,
  RESET_CARD,
  DEPOSIT_LOADING,
  REDUCER_NAME,
  SET_DEPOSIT_ERROR,
  RESET_DEPOSIT_ERROR,
  SET_SUCCESSFUL_PAYMENT,
  RESET_SUCCESSFUL_PAYMENT,
  SET_PAYMENT_PROVIDER,
  SET_PAYMENT_REFERENCE,
  SET_BONUS_VALUES,
  SET_PROVIDER_URL,
  RESET_PROVIDER_URL,
  SET_PROMO_CODE,
  SET_IS_CONNECTION_CREATED,
  SET_DEPOSIT_INFO
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  amount: 0,
  promoCode: null,
  card: null,
  isLoading: false,
  error: null,
  isSuccessfulPayment: null,
  isConnectionCreated: false,
  paymentReference: null,
  bonusValues: [],
  paymentProvider: null,
  providerUrl: null,
  depositInfo: null
});

export const depositReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEPOSIT_LOADING:
      return state.set("isLoading", action.data);
    case SET_DEPOSIT_ERROR:
      return state.set("error", action.data);
    case RESET_DEPOSIT_ERROR:
      return state.set("error", initialState.get("error"));
    case SET_AMOUNT:
      return state.set("amount", action.data);
    case SET_BONUS_VALUES:
      return state.set("bonusValues", action.data);
    case SET_CARD:
      return state.set("card", fromJS(action.data));
    case RESET_CARD:
      return state.set("card", initialState.get("card"));
    case SET_SUCCESSFUL_PAYMENT:
      return state.set("isSuccessfulPayment", true);
    case SET_PROVIDER_URL:
      return state.set("providerUrl", action.data);
    case SET_IS_CONNECTION_CREATED:
      return state.set("isConnectionCreated", action.data);
    case SET_DEPOSIT_INFO:
      return state.set("depositInfo", action.data);
    case RESET_PROVIDER_URL:
      return state.set("providerUrl", null);
    case SET_PAYMENT_PROVIDER:
      return state.set("paymentProvider", action.data);
    case RESET_SUCCESSFUL_PAYMENT:
      return state.set(
        "isSuccessfulPayment",
        initialState.get("isSuccessfulPayment")
      );
    case SET_PAYMENT_REFERENCE:
      return state.set("paymentReference", fromJS(action.data));
    case SET_PROMO_CODE:
      return state.set("promoCode", fromJS(action.data));
    default:
      return state;
  }
};

export const getDepositState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectAmount = state => getDepositState(state).get("amount");
export const selectCard = state => getDepositState(state).get("card");
export const selectIsLoading = state => getDepositState(state).get("isLoading");
export const selectError = state => getDepositState(state).get("error");
export const selectIsSuccessfulPayment = state =>
  getDepositState(state).get("isSuccessfulPayment");
export const selectPaymentReference = state =>
  getDepositState(state).get("paymentReference");
export const selectBonusValues = state =>
  getDepositState(state).get("bonusValues");
export const selectProviderUrl = state =>
  getDepositState(state).get("providerUrl");
export const selectPaymentProvider = state =>
  getDepositState(state).get("paymentProvider");
export const selectPromoCode = state => getDepositState(state).get("promoCode");
export const selectIsConnectionCreated = state =>
  getDepositState(state).get("isConnectionCreated");
export const selectDepositInfo = state =>
  getDepositState(state).get("depositInfo");

reducerRegistry.register(REDUCER_NAME, depositReducer);
