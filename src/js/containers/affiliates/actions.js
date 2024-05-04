import {
  REDUCER_NAME,
  AFFILATES_LOADING,
  AFFILATES_ERROR,
  SET_ERROR,
  SET_AFFILATES,
  SET_PAGINATION,
  ADD_AFFILATE,
  SET_URLS,
  SET_SELECTED_AFFILATE,
  SET_SELECTED_AFFILATE_PLAYERS,
  SET_MEDIA,
  SET_COMMISSION,
  RESET_COMMISSION,
  RESET_AFFILIATE_PLAYERS,
  RESET_SELECTED_AFFILIATE,
  SET_SELECTED_AFFILIATE_URL,
  RESET_SELECTED_AFFILIATE_URL,
  SET_SELECTED_URL,
  RESET_ERROR,
  SET_AFFILIATE_PROMOTIONS,
  SET_SELECTED_PROMOTION,
  RESET_SELECTED_PROMOTION,
  UPDATE_AFFILATE
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";
import { loadPromotions } from "~containers/promotions/actions";

const isLoading = data => ({
  type: AFFILATES_LOADING,
  data
});

const setError = data => ({
  type: SET_ERROR,
  data: getApiErrorMessage(data)
});

export const resetError = data => ({
  type: RESET_ERROR,
  data
});

const isError = data => ({
  type: AFFILATES_ERROR,
  data
});

const setAffiliates = data => ({
  type: SET_AFFILATES,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

const addAffiliate = data => ({
  type: ADD_AFFILATE,
  data
});

const setupdateAffiliate = data => ({
  type: UPDATE_AFFILATE,
  data
});

const setUrls = data => ({
  type: SET_URLS,
  data
});

export const setSelectedUrl = data => ({
  type: SET_SELECTED_URL,
  data
});

export const setSelectedAffiliate = data => ({
  type: SET_SELECTED_AFFILATE,
  data
});

export const setAffiliatePLayers = data => ({
  type: SET_SELECTED_AFFILATE_PLAYERS,
  data
});

export const setMedia = data => ({
  type: SET_MEDIA,
  data
});

export const setAffiliateCommission = data => ({
  type: SET_COMMISSION,
  data
});

export const resetAffiliateCommission = data => ({
  type: RESET_COMMISSION,
  data
});

export const resetAffiliatePlayers = data => ({
  type: RESET_AFFILIATE_PLAYERS,
  data
});

export const setAffiliatePromotions = data => ({
  type: SET_AFFILIATE_PROMOTIONS,
  data
});

export const setSelectedPromotion = data => ({
  type: SET_SELECTED_PROMOTION,
  data
});

export const resetSelectedPromotion = data => ({
  type: RESET_SELECTED_PROMOTION,
  data
});

export const resetSelectedAffiliate = data => ({
  type: RESET_SELECTED_AFFILIATE,
  data
});

export const setSelectedAffiliateUrl = data => ({
  type: SET_SELECTED_AFFILIATE_URL,
  data
});

export const reSetSelectedAffiliateUrl = data => ({
  type: RESET_SELECTED_AFFILIATE_URL,
  data
});

const getApiErrorMessage = error => {
  switch (error) {
    case "AffiliateLinkAlreadyExist":
      return "AffiliateLinkAlreadyExist";
    case "AffiliateUserAlreadyExist":
      return "AffiliateUserAlreadyExist";
    case "AffiliateSameTypePromotionAlreadyAssigned":
      return "AffiliateSameTypePromotionAlreadyAssigned";
    default:
      return "GenericError";
  }
};

export const getAffiliates = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .getAll(data)
    .then(response => {
      dispatch(setAffiliates(response.data));
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

export const getAffiliateById = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .getById(data)
    .then(response => {
      dispatch(setSelectedAffiliate(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      dispatch(setError(error.data));
      console.error(error);
      throw error;
    });
};

export const loadUrls = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .getUrls(data)
    .then(response => {
      dispatch(setUrls(response));
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

export const createAffiliate = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .createAffiliate(data)
    .then(response => {
      dispatch(addAffiliate(response));
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      dispatch(setError(error.data));
      console.error(error);
      throw error;
    });
};

export const createAffiliateUrl = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .createAffiliateUrl(data)
    .then(response => {
      dispatch(loadUrls({ affiliateId: response.affiliateId }));
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      dispatch(setError(error.data));
      throw error;
    });
};

export const getAffiliatePlayers = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .getAffiliatePlayers(data)
    .then(response => {
      dispatch(setAffiliatePLayers(response));
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

export const getAffiliateCommission = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .getTotalCommission(data)
    .then(response => {
      dispatch(setAffiliateCommission(response));
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

export const loadMedia = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .loadMedia(data)
    .then(response => {
      dispatch(setMedia(response));
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

export const updateAffiliate = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .updateAffiliate(data)
    .then(response => {
      dispatch(setupdateAffiliate(response));
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

export const blockAffiliate = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .blockAffiliate(data)
    .then(response => {
      dispatch(getAffiliates({ page: data.page, pageSize: data.pageSize }));
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

export const updateAffiliateUrl = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .updateAffiliateUrl(data)
    .then(response => {
      dispatch(loadUrls({ affiliateId: response.affiliateId }));
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

export const blockAffiliateLink = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .blockAffiliateLink(data)
    .then(response => {
      dispatch(loadUrls({ affiliateId: response.affiliateId }));
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

export const loadAffiliatePromotions = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .loadAffiliatePromotions(data)
    .then(response => {
      dispatch(setAffiliatePromotions(response));
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

export const deleteAffiliatePromotion = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .deleteAffiliatePromotion(data)
    .then(response => {
      dispatch(loadAffiliatePromotions({ affiliateId: data.affiliateId }));
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

export const promoteAffiliate = data => dispatch => {
  dispatch(isLoading(true));
  return Api.affiliates
    .promoteAffiliate(data)
    .then(response => {
      dispatch(loadAffiliatePromotions(data));
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
      console.error(error);
      throw error;
    });
};

export const fetchAffiliates = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getAffiliates(requestData)(dispatch)
  ]);

export const fetchCreateAffiliate = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);

export const fetchAffiliateUrls = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getAffiliateById(requestData.affiliateId)(dispatch),
    loadUrls(requestData)(dispatch)
  ]);

export const fetchCreateAffiliateUrl = ({
  pageData,
  requestData
}) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getAffiliateById(requestData.affiliateId)(dispatch)
  ]);

export const fetchAffiliateReporting = ({
  pageData,
  requestData
}) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getAffiliatePlayers(requestData)(dispatch),
    loadMedia(requestData.affiliateId)(dispatch),
    getAffiliateCommission({ id: requestData.affiliateId })(dispatch)
  ]);

export const fetchAffiliatePromotions = ({
  pageData,
  requestData
}) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    loadAffiliatePromotions(requestData)(dispatch)
  ]);

export const fetchUpdateAffiliate = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getAffiliateById(requestData.id)(dispatch)
  ]);

export const fetchPromoteAffiliate = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    loadPromotions()(dispatch),
    getAffiliateById(requestData.affiliateId)(dispatch)
  ]);

export const fetchUpdateAffiliateUrl = ({
  pageData,
  requestData
}) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getAffiliateById(requestData.id)(dispatch),
    loadUrls(requestData.id)(dispatch)
  ]);
