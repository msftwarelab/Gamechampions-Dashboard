import {
  REDUCER_NAME,
  BONUS_REDUCER_NAME,
  SET_PROFILE,
  RESET_PROFILE,
  PROFILE_LOADING,
  PROFILE_ERROR,
  TRANSACTION_HISTORY,
  SET_BONUS_TRANSACTION_HISTORY,
  SET_PLAYER_BONUS_CAMPAIGN_STATUS,
  RESET_PLAYER_BONUS_CAMPAIGN_STATUS,
  SET_PLAYER_LINKED_BONUS_CAMPAIGNS,
  RESET_PLAYER_LINKED_BONUS_CAMPAIGNS,
  SET_HISTORY_PAGINATION,
  SET_BONUS_PAGINATION
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => {
  return {
    type: PROFILE_LOADING,
    data
  };
};

const isError = data => {
  return {
    type: PROFILE_ERROR,
    data
  };
};

export const setProfile = data => ({
  type: SET_PROFILE,
  data
});

export const resetProfile = data => ({
  type: RESET_PROFILE,
  data
});

export const setTransactionHistory = data => ({
  type: TRANSACTION_HISTORY,
  data
});

export const setBonusTransactionHistory = data => ({
  type: SET_BONUS_TRANSACTION_HISTORY,
  data
});

export const setPlayerBonusCampaignStatus = data => ({
  type: SET_PLAYER_BONUS_CAMPAIGN_STATUS,
  data
});

export const resetPlayerBonusCampaignStatus = data => ({
  type: RESET_PLAYER_BONUS_CAMPAIGN_STATUS,
  data
});

export const setPlayerLinkedBonusCampaigns = data => ({
  type: SET_PLAYER_LINKED_BONUS_CAMPAIGNS,
  data
});

export const resetPlayerLinkedBonusCampaigns = data => ({
  type: RESET_PLAYER_LINKED_BONUS_CAMPAIGNS,
  data
});

const setHistoryPagination = data => ({
  type: SET_HISTORY_PAGINATION,
  data
});

const setBonusPagination = data => ({
  type: SET_BONUS_PAGINATION,
  data
});

export const getProfile = () => dispatch => {
  dispatch(isLoading(true));
  dispatch(resetProfile());
  dispatch(resetPlayerBonusCampaignStatus());
  dispatch(resetPlayerLinkedBonusCampaigns());
  return Api.self
    .get()
    .then(response => {
      dispatch(setProfile(response));
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

export const getTransactionHistory = data => dispatch => {
  dispatch(isLoading(true));
  return Api.transactionHistory
    .getTransactionHistoryData(data)
    .then(response => {
      dispatch(setTransactionHistory(response.data));
      if (data && data.page && data.pageSize) {
        dispatch(
          setHistoryPagination({
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

export const getBonusTransactionHistory = data => dispatch => {
  dispatch(isLoading(true));
  return Api.self
    .getBonusTransactionHistory(data)
    .then(response => {
      dispatch(setBonusTransactionHistory(response.data));
      if (data && data.page && data.pageSize) {
        dispatch(
          setBonusPagination({
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

export const fetchProfile = ({ pageData }) => dispatch => {
  return Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getProfile()(dispatch),
    getTransactionHistory()(dispatch),
    getBonusTransactionHistory()(dispatch)
  ]);
};

export const fetchTransactionHistory = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getTransactionHistory()(dispatch)
  ]);

export const fetchBonusTransactionHistory = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: BONUS_REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getBonusTransactionHistory()(dispatch)
  ]);

export const submitMyAccount = data => dispatch => {
  return Api.profile
    .sendMyAccount(data)
    .then(() => getProfile()(dispatch))
    .catch(error => {
      console.error(error);
      throw error;
    });
};
export const submitMyBankDetails = data => dispatch => {
  return Api.profile
    .sendMyBankDetails(data)
    .then(() => getProfile()(dispatch))
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const submitGamerTags = data => dispatch => {
  return Api.gamerTags
    .sendGamerTags(data)
    .then(() => getProfile()(dispatch))
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const submitChangePassword = data => {
  return Api.authentication
    .changePassword(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const postFile = data =>
  Api.file
    .post(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });

export const getPlayerBonusCampaignStatus = data => dispatch => {
  return Api.players
    .getPlayerBonusCampaignStatus(data)
    .then(response => {
      dispatch(setPlayerBonusCampaignStatus(response));
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getPlayerLinkedBonusCampaigns = data => dispatch => {
  return Api.players
    .getPlayerLinkedBonusCampaigns(data)
    .then(response => {
      dispatch(setPlayerLinkedBonusCampaigns(response));
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const assignDefaultGame = data => dispatch => {
  Api.players
    .assignDefaultGame(data)
    .then(response => response)
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const assignDefaultGameUsername = data => dispatch => {
  Api.players
    .assignDefaultGameUsername(data)
    .then(response => response)
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const claimWelcomeBonus = data => dispatch => {
  Api.players
    .claimWelcomeBonus(data)
    .then(response => response)
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};
