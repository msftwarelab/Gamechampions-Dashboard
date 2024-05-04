import {
  REDUCER_NAME,
  MATCHES_LOADING,
  MATCHES_ERROR,
  SET_PLAYER_MATCHES,
  SET_GAMER_TAGS,
  SET_XPPPOINTS,
  SET_PLAYERSTATS
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: MATCHES_LOADING,
  data
});

const isError = data => ({
  type: MATCHES_ERROR,
  data
});

const setPlayerMatches = data => ({
  type: SET_PLAYER_MATCHES,
  data
});

const setGamerTags = data => ({
  type: SET_GAMER_TAGS,
  data
});
const setXPPoints = data => ({
  type: SET_XPPPOINTS,
  data
});
const setPlayerStats = data => ({
  type: SET_PLAYERSTATS,
  data
});

export const getPlayerMatches = data => dispatch => {
  dispatch(isLoading(true));
  return Api.playerDetails
    .getPlayerMatches(data)
    .then(response => {
      dispatch(setPlayerMatches(response));
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

export const getGamerTags = data => dispatch => {
  return Api.playerDetails
    .getGamerTags(data)
    .then(response => {
      dispatch(setGamerTags(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};
export const getXPPoints = data => dispatch => {
  return Api.players
    .getXPPoints(data)
    .then(response => {
      dispatch(setXPPoints(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
    });
};

export const getPlayerStats = data => dispatch => {
  return Api.players
    .getPlayerStats(data)
    .then(response => {
      dispatch(setPlayerStats(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
    });
};

export const fetchPlayerDetails = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getPlayerMatches(requestData)(dispatch),
    getGamerTags(requestData)(dispatch)
  ]);
