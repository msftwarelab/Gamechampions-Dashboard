import { fromJS } from "immutable";

import {
  SET_MESSAGES,
  RESET_MESSAGES,
  ADD_MESSAGE,
  REDUCER_NAME,
  SET_IS_NEW_MESSAGE,
  SET_IS_NEW_MESSAGE_CONDITIONALLY,
  SET_IS_MESSAGE_CHANNEL_RUNNING,
  SET_IS_CONNECTION_CREATED,
  SET_IS_SENDING_HUB_MESSAGE
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  messages: [],
  isNewMessage: false,
  isConnectionCreated: false,
  isMessageChanelRunning: false,
  isSendingHubMessage: false
});

export const gamesReducer = (state = initialState, action) => {
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
        state.get("messages").toJS().length !== action.data.length
      );
    case SET_IS_MESSAGE_CHANNEL_RUNNING:
      return state.set("isMessageChanelRunning", action.data);
    case SET_IS_CONNECTION_CREATED:
      return state.set("isConnectionCreated", action.data);
    case SET_IS_SENDING_HUB_MESSAGE:
      return state.set("isSendingHubMessage", action.data);
    default:
      return state;
  }
};

export const getGlobalChatState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectMessages = state =>
  getGlobalChatState(state).get("messages");
export const selectIsConnectionCreated = state =>
  getGlobalChatState(state).get("isConnectionCreated");
export const selectIsNewMessage = state =>
  getGlobalChatState(state).get("isNewMessage");

reducerRegistry.register(REDUCER_NAME, gamesReducer);
