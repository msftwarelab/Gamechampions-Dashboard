import {
  REDUCER_NAME,
  SET_MESSAGES,
  ADD_MESSAGE,
  RESET_MESSAGES,
  SET_IS_NEW_MESSAGE,
  SET_IS_NEW_MESSAGE_CONDITIONALLY,
  SET_IS_CONNECTION_CREATED,
  SET_IS_MESSAGE_CHANNEL_RUNNING,
  SET_IS_SENDING_HUB_MESSAGE
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const setMessages = data => ({
  type: SET_MESSAGES,
  data
});

export const addMessage = data => ({
  type: ADD_MESSAGE,
  data
});

export const setIsNewMessage = data => ({
  type: SET_IS_NEW_MESSAGE,
  data
});

export const setSendingHubMessage = data => ({
  type: SET_IS_SENDING_HUB_MESSAGE,
  data
});
export const setConnectionCreated = data => ({
  type: SET_IS_CONNECTION_CREATED,
  data
});

export const setMessageChanelRunning = data => ({
  type: SET_IS_MESSAGE_CHANNEL_RUNNING,
  data
});

// sets isNewMessage to true if length of messages has changed
const setIsNewMessageConditionally = data => ({
  type: SET_IS_NEW_MESSAGE_CONDITIONALLY,
  data
});

export const resetMessages = () => ({
  type: RESET_MESSAGES
});

export const setNewGlobalChatMessageFromHub = data => ({
  type: ADD_MESSAGE,
  data
});

export const createMessage = data => dispatch =>
  Api.globalChat
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

export const getMessages = data => dispatch =>
  Api.globalChat
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

export const initGlobalChatHub = () => dispatch =>
  Api.globalChatHub
    .init()
    .then(() => dispatch(setConnectionCreated(true)))
    .catch(e => console.log(e));

export const getHubMessages = data => dispatch => {
  dispatch(setMessageChanelRunning(true));
  return Api.globalChatHub.getMessages(data, response => {
    dispatch(addMessage(response));
  });
};

export const postHubMessages = data => dispatch => {
  dispatch(setSendingHubMessage(true));
  return Api.globalChatHub
    .sendMessage(data)
    .finally(() => dispatch(setSendingHubMessage(false)));
};

export const fetchGlobalChat = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({ reducerName: REDUCER_NAME, get: getPage, data: pageData })(
      dispatch
    )
  ]);
