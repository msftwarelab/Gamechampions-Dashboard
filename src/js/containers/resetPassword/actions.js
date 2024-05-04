import { SET_PERSON, REDUCER_NAME } from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const setPerson = data => {
  return {
    type: SET_PERSON,
    data
  };
};

export const getPerson = data => dispatch => {
  if (data) {
    return Api.authentication
      .getFromHash(data)
      .then(response => {
        dispatch(setPerson(response));
        return response;
      })
      .catch(() => {
        // if 404, do not break
        return null;
      });
  }
};

export const submitResetPassword = data => {
  return Api.authentication
    .updatePassword(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const fetchResetPassword = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getPerson(requestData.hash)(dispatch)
  ]);
