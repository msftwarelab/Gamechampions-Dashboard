import { fromJS } from "immutable";
import { REDUCER_NAME, SET_PERSON } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  person: {},
  email: "",
  resetPasswordHash: "",
  formValues: {},
  messages: {}
});

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSON:
      return state
        .set("person", action.data)
        .set("email", action.data.email)
        .set("resetPasswordHash", action.data.resetPasswordHash);
    default:
      return state;
  }
};

export const getResetPasswordState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

reducerRegistry.register(REDUCER_NAME, resetPasswordReducer);

export const selectPerson = state => getResetPasswordState(state).get("person");
export const selectEmail = state => getResetPasswordState(state).get("email");
export const selectResetPasswordHash = state =>
  getResetPasswordState(state).get("resetPasswordHash");
