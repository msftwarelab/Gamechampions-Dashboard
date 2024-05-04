import Api from "../../../../service/main";
import { GAMES_ERROR, GAMES_LOADING, GAMES_RESET_ERROR } from "./constants";

const isLoading = data => {
  return {
    type: GAMES_LOADING,
    data
  };
};

export const resetError = data => ({
  type: GAMES_RESET_ERROR,
  data
});

const setError = data => {
  return {
    type: GAMES_ERROR,
    data: getApiErrorMessage(data)
  };
};

const getApiErrorMessage = error => {
  switch (error) {
    case "TooBigPlayerLevelDiference":
      return "TooBigPlayerLevelDiference";
    case "InsufficientFunds":
      return "InsufficientFunds";
    default:
      return "GenericError";
  }
};

export const sendChallenge = data => dispatch => {
  return Api.challenges
    .sendPlayerChallenge(data)
    .then(response => response)
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};
