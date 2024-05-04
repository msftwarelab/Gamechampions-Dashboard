import {
  REDUCER_NAME,
  MATCH_LOBBY_ERROR,
  MATCH_LOBBY_LOADING,
  RECOMMENDED_SCORE_ADVANTAGE,
  CHALLENGEE_DETAILS,
  CHALLENGER_DETAILS,
  SCORE_ADVANTAGE,
  MATCH_PLATFORM,
  CHALLENGER_TEAM,
  DEFENDER_TEAM
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => {
  return {
    type: MATCH_LOBBY_LOADING,
    data
  };
};

const isError = data => {
  return {
    type: MATCH_LOBBY_ERROR,
    data
  };
};

export const setChallengerDetails = data => ({
  type: CHALLENGER_DETAILS,
  data
});

export const setChallengeeDetails = data => ({
  type: CHALLENGEE_DETAILS,
  data
});

export const setChallengerTeam = data => ({
  type: CHALLENGER_TEAM,
  data
});

export const setDefenderTeam = data => ({
  type: DEFENDER_TEAM,
  data
});

export const setRecommendedScoreAdvantage = data => ({
  type: RECOMMENDED_SCORE_ADVANTAGE,
  data
});

export const setScoreAdvantage = data => ({
  type: SCORE_ADVANTAGE,
  data
});

export const setMatchPlatform = data => ({
  type: MATCH_PLATFORM,
  data
});

export const getMatchDetails = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .getMatch(data)
    .then(response => {
      dispatch(setMatchPlatform(response.platform));
      dispatch(setChallengeeDetails(response.challengee));
      dispatch(setChallengerDetails(response.challenger));
      dispatch(setDefenderTeam(response.defenderTeam));
      dispatch(setChallengerTeam(response.challengerTeam));
      dispatch(setRecommendedScoreAdvantage(response.suggestedScoreAdvantage));
      dispatch(setScoreAdvantage(response.scoreAdvantage));
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

export const fetchMatchDetails = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getMatchDetails(requestData)(dispatch)
  ]);

export const submitScoreAdvantage = data => {
  return Api.matches
    .setScoreAdvantage(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });
};
