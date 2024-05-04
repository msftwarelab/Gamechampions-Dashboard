import { fromJS } from "immutable";
import {
  REDUCER_NAME,
  IS_NEW_FACEBOOK_USER,
  SET_FACEBOOK_RESPONSE,
  RESET_FACEBOOK_RESPONSE
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  isNewFacebookUser: false,
  facebookResponse: null
});

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_NEW_FACEBOOK_USER:
      return state.set("isNewFacebookUser", action.data);
    case SET_FACEBOOK_RESPONSE:
      return state.set("facebookResponse", action.data);
    case RESET_FACEBOOK_RESPONSE:
      return state.set(
        "facebookResponse",
        initialState.get("facebookResponse")
      );
    default:
      return state;
  }
};

export const getRegistrationState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectIsNewFacebookUser = state =>
  getRegistrationState(state).get("isNewFacebookUser");

export const selectFacebookResponse = state =>
  getRegistrationState(state).get("facebookResponse");

reducerRegistry.register(REDUCER_NAME, registrationReducer);
