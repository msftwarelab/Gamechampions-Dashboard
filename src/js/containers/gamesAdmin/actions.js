import {
  REDUCER_NAME,
  GAMES_LOADING,
  GAMES_ERROR,
  SET_GAMES,
  SET_PAGINATION,
  REMOVE_GAME,
  GAME_DETAILS_ERROR,
  ADD_GAME
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: GAMES_LOADING,
  data
});

const isError = data => ({
  type: GAMES_ERROR,
  data
});

const setError = data => {
  return {
    type: GAME_DETAILS_ERROR,
    data
  };
};

const setGames = data => ({
  type: SET_GAMES,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

const removeGame = data => ({
  type: REMOVE_GAME,
  data
});

const addGame = data => ({
  type: ADD_GAME,
  data
});

export const getGames = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .get(data)
    .then(response => {
      dispatch(setGames(response.data));
      if (data && data.page && data.pageSize) {
        dispatch(
          setPagination({
            ...response.pagination,
            page: data.page,
            pageSize: data.pageSize
          })
        );
      }
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
export const searchGames = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .search(data)
    .then(response => {
      dispatch(setGames(response.data));
      if (data && data.page && data.pageSize) {
        dispatch(
          setPagination({
            ...response.pagination,
            page: data.page,
            pageSize: data.pageSize
          })
        );
      }
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

export const createGame = data => dispatch => {
  return Api.games
    .createGame(data)
    .then(response => {
      dispatch(addGame(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });
};

export const submitGameDelete = data => dispatch =>
  Api.games
    .deleteGame(data)
    .then(response => {
      dispatch(removeGame(data));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const fetchGames = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);
