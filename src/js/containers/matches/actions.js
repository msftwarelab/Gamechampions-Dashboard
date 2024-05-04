import {
  REDUCER_NAME,
  MATCHES_LOADING,
  MATCHES_ERROR,
  SET_MATCHES,
  SET_BOY_MATCHES,
  SET_TOURNAMENT_HISTORICAL_MATCHES
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

const setMatches = data => ({
  type: SET_MATCHES,
  data
});

const setBoyMatches = data => ({
  type: SET_BOY_MATCHES,
  data
});

const setTournamentHistoricalMatches = data => ({
  type: SET_TOURNAMENT_HISTORICAL_MATCHES,
  data
});

export const getMatches = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .get(data)
    .then(sportsMatches => {
      dispatch(setMatches(sportsMatches));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getSportsMatches = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .get(data)
    .then(sportsMatches => {
      dispatch(setMatches(sportsMatches));
      dispatch(isLoading(false));
      return sportsMatches;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getTournamentsResults = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .getTournamentsResults(data)
    .then(response => {
      dispatch(setTournamentHistoricalMatches(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
    });
};

export const fetchMatches = ({ authentication, games, pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getMatches({
      userId: authentication.profileId,
      games
    })(dispatch)
  ]);
