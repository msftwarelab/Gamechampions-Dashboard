import * as CONSTANTS from "./constants";
import Api from "../../../../service/main";
import { markNewMessagesAsRead as removePlayerRedDot } from "~containers/friends/actions";

const setMessages = data => ({
  type: CONSTANTS.SET_MESSAGES,
  data
});

const addMessage = data => ({
  type: CONSTANTS.ADD_MESSAGE,
  data
});

const setIsNewMessage = data => ({
  type: CONSTANTS.SET_IS_NEW_MESSAGE,
  data
});

const isLoading = data => ({
  type: CONSTANTS.CHAT_LOADING,
  data
});

// sets isNewMessage to true if length of messages has changed
const setIsNewMessageConditionally = data => ({
  type: CONSTANTS.SET_IS_NEW_MESSAGE_CONDITIONALLY,
  data
});

export const resetMessages = () => ({
  type: CONSTANTS.RESET_MESSAGES
});

export const setPersonalMessages = data => ({
  type: CONSTANTS.SET_PERSONAL_MESSAGES,
  data
});

export const markPersonalMessageAsRead = data => ({
  type: CONSTANTS.MARK_PERSONAL_MESSAGE_AS_READ,
  data
});

export const setIsChatPopupOpen = data => ({
  type: CONSTANTS.SET_IS_CHAT_POPUP_OPEN,
  data
});

export const setChatPopupData = data => ({
  type: CONSTANTS.SET_CHAT_POPUP_DATA,
  data
});

export const createMessage = data => dispatch =>
  Api.chat
    .create(data)
    .then(response => {
      dispatch(setIsNewMessage(true));
      dispatch(addMessage(response));
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });

export const lastMessageRead = ({ messageId, userId }) => dispatch => {
  dispatch(isLoading(true));
  return Api.chat
    .lastMessageRead(messageId)
    .then(response => {
      dispatch(markPersonalMessageAsRead(userId));
      dispatch(removePlayerRedDot(userId));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      console.error(error);
      throw error;
    });
};

export const fetchChat = data => dispatch =>
  Api.chat
    .getMessages(data)
    .then(response => {
      dispatch(setIsNewMessageConditionally(response));
      dispatch(setMessages(response));
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });

export const fetchPersonalMessages = () => dispatch =>
  Api.chat
    .getPersonalMessages()
    .then(response => {
      dispatch(setPersonalMessages(response));
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
