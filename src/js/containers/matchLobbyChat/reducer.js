import { fromJS } from "immutable";

import reducerRegistry from "../../util/reducerRegistry";
import {
  SET_MESSAGES,
  RESET_MESSAGES,
  ADD_MESSAGE,
  SET_IS_NEW_MESSAGE,
  SET_IS_NEW_MESSAGE_CONDITIONALLY,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  messages: [],
  isNewMessage: false
});

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return state.set("messages", fromJS(action.data));
    case RESET_MESSAGES:
      return state.set("messages", initialState.get("messages"));
    case ADD_MESSAGE:
      return state.set(
        "messages",
        state.get("messages").push(fromJS(action.data))
      );
    case SET_IS_NEW_MESSAGE:
      return state.set("isNewMessage", action.data);
    case SET_IS_NEW_MESSAGE_CONDITIONALLY:
      return state.set(
        "isNewMessage",
        fromJS(action.data.find(x => !x.isRead && !x.isFromSender))
      );
    default:
      return state;
  }
};

export const getMessagesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectMessages = state => getMessagesState(state).get("messages");
export const selectIsNewMessage = state =>
  getMessagesState(state).get("isNewMessage");

reducerRegistry.register(REDUCER_NAME, messagesReducer);
