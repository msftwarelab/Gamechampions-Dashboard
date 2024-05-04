import { fromJS } from "immutable";

import * as CONSTANTS from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  messages: [],
  isLoading: false,
  isNewMessage: false,
  personalChats: [],
  isChatPopupOpen: false,
  chatPopupData: {}
});

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.CHAT_LOADING:
      return state.set("isLoading", action.data);
    case CONSTANTS.SET_MESSAGES:
      return state.set("messages", fromJS(action.data));
    case CONSTANTS.RESET_MESSAGES:
      return state.set("messages", initialState.get("messages"));
    case CONSTANTS.ADD_MESSAGE:
      return state.set(
        "messages",
        state.get("messages").push(fromJS(action.data))
      );
    case CONSTANTS.SET_IS_NEW_MESSAGE:
      return state.set("isNewMessage", action.data);
    case CONSTANTS.SET_IS_NEW_MESSAGE_CONDITIONALLY:
      return state.set(
        "isNewMessage",
        action.data &&
          action.data.length &&
          !action.data[action.data.length - 1].isRead
      );
    case CONSTANTS.SET_PERSONAL_MESSAGES:
      return state.set("personalChats", fromJS(action.data));
    case CONSTANTS.MARK_PERSONAL_MESSAGE_AS_READ:
      return state.updateIn(
        [
          "personalChats",
          state
            .get("personalChats")
            .findIndex(chat => chat.get("id") === action.data)
        ],
        chat => chat.set("newMessages", 0)
      );
    case CONSTANTS.SET_IS_CHAT_POPUP_OPEN:
      return state.set("isChatPopupOpen", action.data);
    case CONSTANTS.SET_CHAT_POPUP_DATA:
      return state.set("chatPopupData", fromJS(action.data));
    default:
      return state;
  }
};

export const getMessagesState = state => {
  if (state.get(CONSTANTS.REDUCER_NAME)) {
    return state.get(CONSTANTS.REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectMessages = state => getMessagesState(state).get("messages");
export const selectIsNewMessage = state =>
  getMessagesState(state).get("isNewMessage");
export const selectIsLoading = state =>
  getMessagesState(state).get("isLoading");
export const selectPersonalMessages = state =>
  getMessagesState(state).get("personalChats");
export const selectIsChatPopupOpen = state =>
  getMessagesState(state).get("isChatPopupOpen");
export const selectChatPopupData = state =>
  getMessagesState(state).get("chatPopupData");

reducerRegistry.register(CONSTANTS.REDUCER_NAME, messagesReducer);
