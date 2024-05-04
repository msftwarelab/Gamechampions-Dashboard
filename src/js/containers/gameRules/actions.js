import {
  REDUCER_NAME,
  GAME_RULES_LOADING,
  GAME_RULES_ERROR,
  SET_GAME_RULES
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";
import { getGame } from "~containers/gameLobby/actions";

const isLoading = data => ({
  type: GAME_RULES_LOADING,
  data
});

const isError = data => ({
  type: GAME_RULES_ERROR,
  data
});

const setGameRules = data => ({
  type: SET_GAME_RULES,
  data
});

export const getGameRules = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .getGameRules(data)
    .then(response => {
      dispatch(setGameRules(response));
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

export const fetchGameRules = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getGame(requestData)(dispatch)
  ]);
