import {
  REDUCER_NAME,
  SET_LOADING,
  SET_ERROR,
  SET_BONUSES,
  SET_PAGINATION,
  REMOVE_BONUS,
  ADD_BONUS,
  UPDATE_BONUS,
  SET_SELECTED_BONUS,
  SET_DIRECT_BONUSES
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

const setBonuses = data => ({
  type: SET_BONUSES,
  data
});

export const setSelectedBonus = data => ({
  type: SET_SELECTED_BONUS,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

const removeBonus = data => ({
  type: REMOVE_BONUS,
  data
});

const addBonus = data => ({
  type: ADD_BONUS,
  data
});

const updateBonus = data => ({
  type: UPDATE_BONUS,
  data
});

const setDirectBonuses = data => ({
  type: SET_DIRECT_BONUSES,
  data
});

export const getBonuses = data => dispatch => {
  dispatch(isLoading(true));
  return Api.bonusCampaigns
    .get(data)
    .then(response => {
      dispatch(setBonuses(response.data));
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
      dispatch(setError(true));
      console.error(error);
      throw error;
    });
};

export const getDirectBonusCampaings = () => dispatch => {
  dispatch(isLoading(true));
  return Api.bonusCampaigns
    .getDirectBonusCampaigns()
    .then(response => {
      dispatch(setDirectBonuses(response));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(setError(error));
      dispatch(isLoading(false));
    });
};

export const getBonusById = data => dispatch => {
  dispatch(isLoading(true));
  return Api.bonusCampaigns
    .getById(data)
    .then(response => {
      dispatch(setSelectedBonus(response));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(setError(error));
      dispatch(isLoading(false));
    });
};

export const submitCreateBonus = data => dispatch => {
  return Api.bonusCampaigns
    .create(data)
    .then(response => {
      dispatch(addBonus(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
      throw error;
    });
};

export const submitUpdateBonus = data => dispatch => {
  return Api.bonusCampaigns
    .update(data)
    .then(response => {
      dispatch(updateBonus(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
      throw error;
    });
};

export const submitDeleteBonus = data => dispatch =>
  Api.bonusCampaigns
    .delete(data)
    .then(response => {
      dispatch(removeBonus(data));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const fetchBonuses = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getBonuses()(dispatch)
  ]);

export const fetchBonus = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getBonusById(requestData)(dispatch)
  ]);
