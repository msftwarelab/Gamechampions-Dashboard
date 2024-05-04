import {
  REDUCER_NAME,
  MATCH_LOADING,
  MATCH_ERROR,
  SET_MATCH,
  SET_TEAMS,
  SET_MATCH_STATUS,
  SET_CHALLENGEE_XPPOINTS,
  SET_CHALLENGER_XPPOINTS,
  SET_ERROR,
  RESET_ERROR,
  SUBMIT_PHOTO_PROOF
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const getApiErrorMessage = error => {
  switch (error) {
    case "InsufficientFunds":
      return "LowBalanceMessage";
    case "OpponentInsufficientFunds":
      return "OpponentLowBalanceMessage";
    case "PlayerTagsMissing":
      return "PlayerTagsMissing";
    case "PlayerHasALiveMatch":
      return "PlayerHasALiveMatch";
    case "ChallengerHasALiveMatch":
      return "ChallengerHasALiveMatch";
    case "OpponentFreeMatchesExceeded":
      return "OpponentFreeMatchesExceeded";
    default:
      return "GenericError";
  }
};

const isLoading = data => ({
  type: MATCH_LOADING,
  data
});

const isError = data => ({
  type: MATCH_ERROR,
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

const setMatch = data => ({
  type: SET_MATCH,
  data
});

const setMatchStatus = data => ({
  type: SET_MATCH_STATUS,
  data
});

const setChallengerXPPoints = data => ({
  type: SET_CHALLENGER_XPPOINTS,
  data
});

const setChallengeeXPPoints = data => ({
  type: SET_CHALLENGEE_XPPOINTS,
  data
});

const setTeams = data => ({
  type: SET_TEAMS,
  data
});

export const getMatch = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .getMatch(data)
    .then(response => {
      dispatch(setMatch(response));
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

export const resetMatchData = () => dispatch => {
  dispatch(setMatch());
};

export const getMatchStatus = data => dispatch => {
  return Api.matches
    .getMatchStatus(data)
    .then(response => {
      dispatch(setMatchStatus(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const updateMatchStatus = data => dispatch => {
  return Api.matches
    .updateMatchStatus(data)
    .then(() => {
      getMatchStatus(data)(dispatch);
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getChallengeeXPPoints = data => dispatch => {
  return Api.players
    .getXPPoints(data)
    .then(response => {
      dispatch(setChallengeeXPPoints(response));
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
    });
};
export const getChallengerXPPoints = data => dispatch => {
  return Api.players
    .getXPPoints(data)
    .then(response => {
      dispatch(setChallengerXPPoints(response));
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
    });
};

export const updatetResult = data => dispatch => {
  return Api.matches
    .setScoreAdvantage(data)
    .then(() => {
      getMatchStatus(data)(dispatch);
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};
export const updateStartMatch = data => dispatch => {
  return Api.matches
    .startMatch(data)
    .then(() => {
      getMatch(data)(dispatch);
    })
    .catch(error => {
      dispatch(setError(error.data));
    });
};

export const updateAcceptChallenge = data => dispatch => {
  return Api.matches
    .acceptChallenge(data)
    .then(() => {
      getMatch(data)(dispatch);
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      dispatch(setError(error.data));
      throw getApiErrorMessage(error.data);
    });
};

export const updateRefuseChallenge = data => dispatch => {
  return Api.matches
    .refuseChallenge(data)
    .then(() => {
      getMatchStatus(data)(dispatch);
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const updateCancelChallenge = data => dispatch => {
  return Api.matches
    .cancelChallenge(data)
    .then(() => {
      getMatchStatus(data)(dispatch);
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const fetchMatchLobby = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getMatch(requestData)(dispatch),
    getMatchStatus(requestData)(dispatch)
  ]);

export const postFile = data =>
  Api.file
    .post(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });

export const getTeams = data => dispatch => {
  dispatch(isLoading(true));
  return Api.teams
    .getTeams(data)
    .then(response => {
      dispatch(setTeams(response));
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

export const submitPhotoProof = data => ({
  type: SUBMIT_PHOTO_PROOF,
  data
});

export const submitProof = data => dispatch => {
  return Api.matches.submitPhotoProof(data).then(response => {
    dispatch(submitPhotoProof(data));
    return response;
  });
};
