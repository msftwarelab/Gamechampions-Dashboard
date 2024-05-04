import {
  REDUCER_NAME,
  SET_LOADING,
  SET_ERROR,
  SET_RECENT_PLAYERS
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: SET_LOADING,
  data
});

const isError = data => ({
  type: SET_ERROR,
  data
});

const setRecentPlayers = data => ({
  type: SET_RECENT_PLAYERS,
  data
});

export const getRecentPlayers = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .getRecentPlayers(data)
    .then(response => {
      dispatch(setRecentPlayers(response.data));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
    });
};

export const fetchRecentPlayers = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getRecentPlayers(requestData)(dispatch)
  ]);
