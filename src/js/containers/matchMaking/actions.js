import {
  REDUCER_NAME,
  INSTANT_MATCHES_LOADING,
  INSTANT_MATCHES_ERROR,
  SET_INSTANT_MATCHES,
  SET_GAME,
  RESET_GAME
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";
import { setGame as setGameLobby } from "../gameLobby/actions";

const isLoading = data => ({
  type: INSTANT_MATCHES_LOADING,
  data
});

const isError = data => ({
  type: INSTANT_MATCHES_ERROR,
  data
});

const setInstantMatches = data => ({
  type: SET_INSTANT_MATCHES,
  data
});

const setGame = data => ({
  type: SET_GAME,
  data
});

export const resetGame = data => ({
  type: RESET_GAME,
  data
});

export const getInstantMatches = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .getInstantMatches(data)
    .then(response => {
      dispatch(setInstantMatches(response));
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getGame = data => dispatch => {
  return Api.games
    .getGame(data)
    .then(response => {
      dispatch(setGame(response));
      dispatch(setGameLobby(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const fetchMatchMaking = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getInstantMatches(requestData)(dispatch),
    getGame(requestData)(dispatch)
  ]);
