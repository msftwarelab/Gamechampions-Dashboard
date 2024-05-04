import { fromJS } from "immutable";
import * as CONSTANTS from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  offers: null,
  isLoading: false,
  isError: false
});

export const accountBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.OFFERS_LOADING:
      return state.set("isLoading", action.data);
    case CONSTANTS.OFFERS_ERROR:
      return state.set("isError", action.data);
    case CONSTANTS.SET_OFFERS:
      return state.set("offers", fromJS(action.data));
    default:
      return state;
  }
};

export const getOffersState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectOffers = state => getOffersState(state).get("offers");
export const selectIsLoading = state => getOffersState(state).get("isLoading");

reducerRegistry.register(CONSTANTS.REDUCER_NAME, accountBalanceReducer);
