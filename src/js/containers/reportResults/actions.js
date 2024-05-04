import { REPORT_RESULT_ERROR } from "./constants";
import Api from "../../../../service/main";
import { updateAdminMatches } from "~containers/matchesAdmin/actions";

const setError = data => {
  return {
    type: REPORT_RESULT_ERROR,
    data
  };
};

export const submitResults = data => dispatch => {
  return Api.matches
    .setResult(data)
    .then(response => response)
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });
};

export const submitAdminResults = data => dispatch => {
  return Api.matches
    .setAdminResult(data)
    .then(response => dispatch(updateAdminMatches(response)))
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });
};
