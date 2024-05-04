import { SET_START_TIME, REPORT_MISSING_OPPONENT } from "./constants";
import Api from "../../../../service/main";

export const reportMissingPlayer = data => ({
  type: REPORT_MISSING_OPPONENT,
  data
});

export const reportOpponent = data => dispatch => {
  return Api.matches.reportMissingPlayer(data).then(response => {
    dispatch(reportMissingPlayer(data));
    return response;
  });
};

export const setMatchStartTime = data => ({
  type: SET_START_TIME,
  data
});

export const matchStartTime = data => dispatch => {
  return Api.matches
    .getMatchStartTime(data)
    .then(response => {
      dispatch(setMatchStartTime(response.startTime));
      return response;
    })
    .catch(error => {
      console.error(error);
    });
};
