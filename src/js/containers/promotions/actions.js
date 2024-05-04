import {
  REDUCER_NAME,
  PROMOTIONS_LOADING,
  PROMOTIONS_ERROR,
  SET_PAGINATION,
  SET_PROMOTIONS,
  UPDATE_PROMOTION,
  SET_SELECTED_PROMOTION,
  RESET_SELECTED_PROMOTION,
  ADD_PROMOTION
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: PROMOTIONS_LOADING,
  data
});

const isError = data => ({
  type: PROMOTIONS_ERROR,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

const setPromotions = data => ({
  type: SET_PROMOTIONS,
  data
});

export const resetSelectedPromotion = data => ({
  type: RESET_SELECTED_PROMOTION,
  data
});

export const setSelectedPromotion = data => ({
  type: SET_SELECTED_PROMOTION,
  data
});

export const setUpdatePromotion = data => ({
  type: UPDATE_PROMOTION,
  data
});

export const setAddPromotion = data => ({
  type: ADD_PROMOTION,
  data
});

export const laodAllPromotions = () => dispatch => {
  dispatch(isLoading(true));
  return Api.promotions
    .getAllPrmotions()
    .then(response => {
      dispatch(setPromotions(response.data));
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

export const loadPromotions = data => dispatch => {
  dispatch(isLoading(true));
  return Api.promotions
    .getAll(data)
    .then(response => {
      dispatch(setPromotions(response.data));
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

export const createPromotion = data => dispatch => {
  dispatch(isLoading(true));
  return Api.promotions
    .createPromotion(data)
    .then(response => {
      dispatch(setAddPromotion(response));
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

export const updatePromotion = data => dispatch => {
  dispatch(isLoading(true));
  return Api.promotions
    .updatePromotion(data)
    .then(response => {
      dispatch(setUpdatePromotion(response));
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

export const getPromotionById = data => dispatch => {
  dispatch(isLoading(true));
  return Api.promotions
    .getPromotionById(data)
    .then(response => {
      dispatch(setSelectedPromotion(response));
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

export const deletePromotion = data => dispatch => {
  dispatch(isLoading(true));
  return Api.promotions
    .deletePromotion(data)
    .then(response => {
      dispatch(loadPromotions({ page: data.page, pageSize: data.pageSize }));
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

export const fetchPromotions = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    loadPromotions(requestData)(dispatch)
  ]);

export const fetchCreatePromotion = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);

export const fetchUpdatePromotion = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getPromotionById(requestData.promotionId)(dispatch)
  ]);
