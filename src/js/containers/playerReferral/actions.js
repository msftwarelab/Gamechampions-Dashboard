import {
  REDUCER_NAME,
  SET_REFERRAL_LINK,
  RESET_REFERRAL_LINK,
  SET_ERROR,
  RESET_ERROR,
  SET_LOADING
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: SET_LOADING,
  data
});

const setError = data => ({
  type: SET_ERROR,
  data
});

const resetError = data => ({
  type: RESET_ERROR,
  data
});

const setReferralLink = data => ({
  type: SET_REFERRAL_LINK,
  data
});

export const resetReferralLink = data => ({
  type: RESET_REFERRAL_LINK,
  data
});

export const getReferralLink = data => dispatch => {
  dispatch(isLoading(true));
  dispatch(resetError());

  return Api.self
    .getReferralLink(data)
    .then(response => {
      dispatch(setReferralLink(response));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error));
    });
};

export const fetchPlayerReferral = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getReferralLink(requestData)(dispatch)
  ]);
