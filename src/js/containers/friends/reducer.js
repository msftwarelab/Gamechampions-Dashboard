import { fromJS } from "immutable";

import {
  FRIENDS_LOADING,
  FRIENDS_ERROR,
  REDUCER_NAME,
  SET_FRIENDS,
  SET_FRIEND,
  RESET_FRIEND,
  SET_PAGINATION,
  MARK_NEW_MESSAGES_AS_READ
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  friends: [],
  isLoading: false,
  isError: false,
  pagination: { page: 1, itemCount: null }
});

export const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_LOADING:
      return state.set("isLoading", action.data);
    case FRIENDS_ERROR:
      return state.set("isError", action.data);
    case SET_FRIENDS:
      return state.set("friends", fromJS(action.data));
    case SET_FRIEND:
      return state.set(
        "friends",
        state
          .get("friends")
          .map(item =>
            item.set("isSelected", action.data.id === item.get("id"))
          )
      );
    case RESET_FRIEND:
      return state.set(
        "friends",
        state.get("friends").map(item => item.set("isSelected", false))
      );
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));

    case MARK_NEW_MESSAGES_AS_READ:
      return state.updateIn(
        [
          "friends",
          state.get("friends").findIndex(chat => chat.get("id") === action.data)
        ],
        chat => chat?.set("hasUnreadMessages", false)
      );

    default:
      return state;
  }
};

export const getFriendsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectFriends = state => getFriendsState(state).get("friends");
export const selectIsLoading = state => getFriendsState(state).get("isLoading");
export const selectPagination = state =>
  getFriendsState(state).get("pagination");

reducerRegistry.register(REDUCER_NAME, friendsReducer);
