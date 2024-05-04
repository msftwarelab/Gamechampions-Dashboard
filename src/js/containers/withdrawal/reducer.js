import { fromJS } from "immutable";
import { SET_AMOUNT, REDUCER_NAME } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  amount: null
});

export const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AMOUNT:
      return state.set("amount", action.data);
    default:
      return state;
  }
};

export const getWithdrawalState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectAmount = state => getWithdrawalState(state).get("amount");

reducerRegistry.register(REDUCER_NAME, withdrawalReducer);
