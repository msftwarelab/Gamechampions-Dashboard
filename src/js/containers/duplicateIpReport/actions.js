import {
  REDUCER_NAME,
  LOADING,
  ERROR,
  SET_DUPLICATE_IP_PLAYERS,
  SET_DUPLICATE_IP_PLAYERS_DETAIL,
  SET_PAGINATION,
  SET_ADMIN_FILTER_FROM,
  SET_ADMIN_FILTER_TO,
  RESET_ERROR,
  SET_DETAIL_PAGINATION
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: LOADING,
  data
});

export const resetError = data => ({
  type: RESET_ERROR,
  data
});

const isError = data => ({
  type: ERROR,
  data
});

const setDuplicateIpPlayer = data => ({
  type: SET_DUPLICATE_IP_PLAYERS,
  data
});

const setDuplicateIpPlayerDetail = data => ({
  type: SET_DUPLICATE_IP_PLAYERS_DETAIL,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

const setDetailPagination = data => ({
  type: SET_DETAIL_PAGINATION,
  data
});

export const setFilterFrom = data => ({
  type: SET_ADMIN_FILTER_FROM,
  data
});

export const setFilterTo = data => ({
  type: SET_ADMIN_FILTER_TO,
  data
});

export const getDuplicatePlayerIps = data => dispatch => {
  dispatch(isLoading(true));
  return Api.players
    .getDuplicatePlayers(data)
    .then(response => {
      dispatch(setDuplicateIpPlayer(response.data));
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
      console.error(error);
      throw error;
    });
};

export const getDuplicatePlayerIpsDetail = data => dispatch => {
  dispatch(isLoading(true));
  return Api.players
    .getDuplicatePlayersDetail(data)
    .then(response => {
      dispatch(setDuplicateIpPlayerDetail(response.data));
      if (data && data.page && data.pageSize) {
        dispatch(
          setDetailPagination({
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
      console.error(error);
      throw error;
    });
};

export const fetchDuplicatePlayerIps = ({
  pageData,
  requestData
}) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getDuplicatePlayerIps(requestData)(dispatch)
  ]);

export const fetchDuplicatePlayerIpsDetail = ({
  pageData,
  requestData
}) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getDuplicatePlayerIpsDetail(requestData)(dispatch)
  ]);
