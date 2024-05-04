import { SET_OFFERS, OFFERS_LOADING, OFFERS_ERROR } from "./constants";
import Api from "../../../../service/main";

export const setOffers = data => ({
  type: SET_OFFERS,
  data
});

const isLoading = data => {
  return {
    type: OFFERS_LOADING,
    data
  };
};

const isError = data => {
  return {
    type: OFFERS_ERROR,
    data
  };
};

export const getOffers = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .getOffers(data)
    .then(response => {
      dispatch(setOffers(response));
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

export const fetchOffers = data => dispatch =>
  Promise.all([getOffers(data)(dispatch)]);
