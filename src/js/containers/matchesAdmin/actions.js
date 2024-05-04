import {
  REDUCER_NAME,
  SET_PAGINATION,
  MATCHES_LOADING,
  MATCHES_ERROR,
  SET_MATCHES,
  UPDATE_MATCH
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: MATCHES_LOADING,
  data
});

const isError = data => ({
  type: MATCHES_ERROR,
  data
});

const setMatches = data => ({
  type: SET_MATCHES,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

export const updateAdminMatches = data => ({
  type: UPDATE_MATCH,
  data
});

export const updateAdminDeleteChallenge = data => dispatch => {
  return Api.matches
    .adminCancelChallenge(data.matchId)
    .then(() => {
      getMatches({
        type: data.type,
        page: data.page,
        pageSize: data.pageSize
      })(dispatch);
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getMatches = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .getAdminMatches(data)
    .then(response => {
      dispatch(setMatches(response.data));
      if (data && data.page && data.pageSize) {
        dispatch(
          setPagination({
            ...response.pagination,
            page: data.page,
            pageSize: data.pageSize
          })
        );
      }
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      throw error;
    });
};

export const createAdminMatch = data => dispatch => {
  dispatch(isLoading(true));
  return Api.matches
    .createAdminMatch(data)
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      throw error;
    });
};

export const fetchMatches = ({ pageData, matchesData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getMatches(matchesData)(dispatch)
  ]);
