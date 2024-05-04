import {
  REDUCER_NAME,
  SET_LOADING,
  SET_ERROR,
  RESET_ERROR,
  SET_TOURNAMENT_RANKING,
  RESET_TOURNAMENT_RANKING,
  SET_TOURNAMENT,
  RESET_TOURNAMENT,
  SET_TOURNAMENTS_LIST
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: SET_LOADING,
  data
});

const setError = data => ({
  type: SET_ERROR,
  data: getApiErrorMessage(data)
});

export const resetError = data => ({
  type: RESET_ERROR,
  data
});

const setTournamentRanking = data => ({
  type: SET_TOURNAMENT_RANKING,
  data
});
const setTournament = data => ({
  type: SET_TOURNAMENT,
  data
});
export const resetTournament = () => ({
  type: RESET_TOURNAMENT
});

export const resetTournamentRanking = data => ({
  type: RESET_TOURNAMENT_RANKING,
  data
});

export const setTournamentList = data => ({
  type: SET_TOURNAMENTS_LIST,
  data
});

const getApiErrorMessage = error => {
  switch (error.data) {
    case "TournamentNotFound":
      return "TournamentNotFound";
    case "PlayerFreeMatchesExceeded":
      return "PlayerFreeMatchesExceeded";
    case "PlayerHasALiveMatch":
      return "PlayerHasALiveMatch";
    case "PlayerTagsMissing":
      return "PlayerTagsMissing";
    case "InsufficientFunds":
      return "InsufficientFunds";
    default:
      return "GenericError";
  }
};

export const getTournament = data => dispatch => {
  dispatch(isLoading(true));
  return Api.tournaments
    .getTournament(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setTournament(response));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error));
      console.error(error);
    });
};

export const getTournamentRanking = data => dispatch => {
  dispatch(isLoading(true));
  return Api.tournaments
    .getTournamentRanking(data)
    .then(response => {
      dispatch(setTournamentRanking(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error));
      console.error(error);
    });
};

export const getTournamentTopHundred = data => dispatch => {
  dispatch(isLoading(true));
  return Api.tournaments
    .getTournamentTopHundred(data)
    .then(response => {
      dispatch(setTournamentRanking(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error));
      console.error(error);
    });
};

export const getTournamentsList = data => dispatch => {
  dispatch(isLoading(true));
  return Api.tournaments
    .getTournamentsList(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setTournamentList(response));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error));
      console.error(error);
    });
};

export const purchaseFreeMatches = data => dispatch => {
  dispatch(isLoading(true));
  return Api.transactions
    .purchaseFreeMatches(data)
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error));
      console.error(error);
      throw error;
    });
};

export const fetchTournaments = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getTournamentRanking(requestData)(dispatch)
  ]);
