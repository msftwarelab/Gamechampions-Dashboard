import { fromJS } from "immutable";

import { SET_REFERRER_ID, REDUCER_NAME } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  referrerId: ""
});

export const addFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REFERRER_ID:
      return state.set("referrerId", action.data.referrerId);
    default:
      return state;
  }
};

export const getAddFriendsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectReferrerId = state =>
  getAddFriendsState(state).get("referrerId");

reducerRegistry.register(REDUCER_NAME, addFriendReducer);
