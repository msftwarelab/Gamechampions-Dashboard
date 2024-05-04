import Api from "../../../../service/main";
import {
  SET_MESSAGES,
  ADD_MESSAGE,
  SET_IS_NEW_MESSAGE,
  SET_IS_NEW_MESSAGE_CONDITIONALLY,
  RESET_MESSAGES,
  REDUCER_NAME
} from "./constants";
import { getGame } from "../gameLobby/actions";

import { renderPage, getPage } from "~containers/page/actions";

const setMessages = data => ({
  type: SET_MESSAGES,
  data
});

const addMessage = data => ({
  type: ADD_MESSAGE,
  data
});

const setIsNewMessage = data => ({
  type: SET_IS_NEW_MESSAGE,
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

export const createMessage = data => dispatch =>
  Api.gameLobbyChat
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
  Api.gameLobbyChat
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

export const fetchGameLobbyChat = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({ reducerName: REDUCER_NAME, get: getPage, data: pageData })(
      dispatch
    ),
    getGame(requestData)(dispatch)
  ]);
