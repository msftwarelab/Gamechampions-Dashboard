import {
  REDUCER_NAME,
  GAMES_AND_RULES,
  SET_TOURNAMENT,
  RESET_TOURNAMENT,
  GAMES_ERROR,
  GAMES_LOADING,
  GAMES_RESET_ERROR
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";
import { getProfile } from "~containers/myaccount/actions";

const isLoading = data => {
  return {
    type: GAMES_LOADING,
    data
  };
};

export const resetError = () => ({
  type: GAMES_RESET_ERROR
});

const setError = data => {
  return {
    type: GAMES_ERROR,
    data: getApiErrorMessage(data)
  };
};

export const setGamesAndRules = data => ({
  type: GAMES_AND_RULES,
  data
});

export const setTournament = data => ({
  type: SET_TOURNAMENT,
  data
});

export const resetTournament = () => ({
  type: RESET_TOURNAMENT
});

const getApiErrorMessage = error => {
  if (error.errorCode === 475) {
    return "RequestPlayerTags";
  } else {
    switch (error) {
      case "PlayerExceededInstantMatchLimit":
        return "PlayerExceededInstantMatchLimit";
      case "TournamentNotFound":
        return "TournamentNotFound";
      case "InsufficientFunds":
        return "InsufficientFunds";
      default:
        return "GenericError";
    }
  }
};

export const getTournament = data => dispatch => {
  dispatch(resetTournament());
  dispatch(isLoading(true));
  return Api.tournaments
    .getTournament(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setTournament(response));
      return response;
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

export const getGamesAndRules = data => dispatch => {
  dispatch(isLoading(true));
  return Api.challenges
    .getGamesAndRules(data)
    .then(response => {
      dispatch(setGamesAndRules(response));
      return response;
    })
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

export const getEntryFee = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .getEntryFee(data)
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const fetchGameRulesAndAccountBalance = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getGamesAndRules()(dispatch),
    getProfile()(dispatch)
  ]);

export const submitChallenge = data => dispatch => {
  return Api.challenges
    .sendChallenge(data)
    .then(response => response)
    .catch(error => {
      dispatch(isLoading(false));
      if (error.data !== "PlayerDailyFreeMatchesExceeded") {
        dispatch(setError(error.data));
      }
      throw error;
    });
};
