import * as CONSTANTS from "./constants";
import Api from "../../../../service/main";

const setPageNotFound = data => {
  return {
    type: CONSTANTS.SET_PAGE_NOT_FOUND,
    data
  };
};

export const fetchPageNotFound = data => {
  return dispatch => {
    return Api.pages
      .get(data)
      .then(response => {
        dispatch(setPageNotFound(response));
        return response;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
