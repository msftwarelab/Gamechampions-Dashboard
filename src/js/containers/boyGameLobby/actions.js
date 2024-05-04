import {
  BOY_GAME_LOBBY_ERROR,
  BOY_GAME_LOBBY_LOADING,
  REDUCER_NAME,
  SET_BOY_OUTCOMES,
  SET_DASHBOARD_FOOTER,
  SET_HAS_PLAYER_RECEIVED_WELCOME_BONUS,
  SET_UPLAY_GAMES,
  SET_UPLAY_QUICKLINKS,
  RESET_BOY_OUTCOMES
} from "./constants";
import Api from "../../../../service/main";
import { getPage, renderPage } from "~containers/page/actions";

const isLoading = data => ({
  type: BOY_GAME_LOBBY_LOADING,
  data
});

const setError = data => ({
  type: BOY_GAME_LOBBY_ERROR,
  data: data ? getBoyApiErrorMessage(data) : null
});

const setBoyOutcomes = data => ({
  type: SET_BOY_OUTCOMES,
  data
});

const setHasPlayerReceivedWelcomeBonus = data => ({
  type: SET_HAS_PLAYER_RECEIVED_WELCOME_BONUS,
  data
});

export const resetBoyOutcomes = data => ({
  type: RESET_BOY_OUTCOMES,
  data
});

export const getBoyApiErrorMessage = errorCode => {
  if (errorCode >= 422 && errorCode <= 457) {
    return `BoyError${errorCode}`;
  } else {
    return "GenericError";
  }
};

export const clearBoyOutcomes = () => dispatch => {
  dispatch(setBoyOutcomes(null));
};

const setUplayGames = data => ({
  type: SET_UPLAY_GAMES,
  data
});

const setUplayQuickLinks = data => ({
  type: SET_UPLAY_QUICKLINKS,
  data
});

const setDashboardFooter = data => ({
  type: SET_DASHBOARD_FOOTER,
  data
});

export const getUplayGames = data => dispatch => {
  dispatch(isLoading(true));
  dispatch(setError(null));
  return Api.boyGames
    .getBoyGames(data)
    .then(response => {
      dispatch(setUplayGames(response));
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(
        setError(error.data && error.data.errorCode ? error.data.errorCode : -1)
      );
      console.error(error);
      throw error;
    });
};

export const getUplayQuickLinks = data => dispatch => {
  dispatch(isLoading(true));
  dispatch(setError(null));
  return Api.boyGames
    .getBoyQuickLinks(data)
    .then(response => {
      dispatch(setUplayQuickLinks(response));
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(
        setError(error.data && error.data.errorCode ? error.data.errorCode : -1)
      );
      console.error(error);
      throw error;
    });
};

export const getDashboardFooter = data => dispatch => {
  dispatch(setError(null));
  return Api.boyGames
    .getDashboardFooter(data)
    .then(response => {
      dispatch(setDashboardFooter(response));
      return response;
    })
    .catch(error => {
      dispatch(
        setError(error.data && error.data.errorCode ? error.data.errorCode : -1)
      );
      console.error(error);
      throw error;
    });
};

export const getWelcomeBonus = data => dispatch => {
  dispatch(setError(null));
  dispatch(setHasPlayerReceivedWelcomeBonus(null));
  return Api.bonusCampaigns
    .getWelcomeBonus(data)
    .then(response => {
      dispatch(setHasPlayerReceivedWelcomeBonus(response));
    })
    .catch(error => {
      dispatch(setError(error));
    });
};

export const fetchUPlayGames = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getUplayGames(requestData)(dispatch),
    getUplayQuickLinks(requestData)(dispatch)
  ]);
