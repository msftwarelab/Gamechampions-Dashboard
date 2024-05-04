import {
  REDUCER_NAME,
  LEADER_BOARDS_LOADING,
  LEADER_BOARDS_ERROR,
  SET_LEADER_BOARDS,
  SET_GAME_ID
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: LEADER_BOARDS_LOADING,
  data
});

const isError = data => ({
  type: LEADER_BOARDS_ERROR,
  data
});

const setLeaderBoards = data => ({
  type: SET_LEADER_BOARDS,
  data
});
const setGameId = data => ({
  type: SET_GAME_ID,
  data
});

export const getLeaderBoards = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .getLeaderBoards(data)
    .then(response => {
      dispatch(setLeaderBoards(response));
      dispatch(setGameId(data));
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
export const fetchLeaderBoards = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getLeaderBoards(requestData)(dispatch)
  ]);
