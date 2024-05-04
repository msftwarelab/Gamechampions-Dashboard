import { REDUCER_NAME, SET_REFERRER_ID } from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const setReferrerId = data => ({
  type: SET_REFERRER_ID,
  data
});

export const getReferrerId = data => dispatch => {
  return Api.friends
    .getReferrerId(data)
    .then(response => {
      dispatch(setReferrerId(response));
      return response;
    })
    .catch(error => {
      console.error(error);
    });
};

export const submitSendInvite = data => {
  return Api.friends
    .sendInvite(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const fetchAddFriend = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);
