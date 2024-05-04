import {
  REDUCER_NAME,
  BONUS_MONEY,
  AVAILABLE_AMOUNT,
  WALLET_LOADING,
  WALLET_ERROR,
  COMMISSION,
  DEPOSIT_COUNT,
  INPLAY_BALANCE
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

export const setBonusMoney = data => ({
  type: BONUS_MONEY,
  data
});
export const setCommission = data => ({
  type: COMMISSION,
  data
});

export const setAvailableAmount = data => ({
  type: AVAILABLE_AMOUNT,
  data
});

export const setInplayBalance = data => ({
  type: INPLAY_BALANCE,
  data
});

export const setDepositCount = data => ({
  type: DEPOSIT_COUNT,
  data
});

const isLoading = data => {
  return {
    type: WALLET_LOADING,
    data
  };
};

const isError = data => {
  return {
    type: WALLET_ERROR,
    data
  };
};

export const getWalletAmount = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .getWalletAmount(data)
    .then(response => {
      dispatch(setBonusMoney(response.bonusMoney));
      dispatch(setAvailableAmount(response.availableAmount));

      return Api.self
        .getInplayBalance()
        .then(inPlayBalance => {
          dispatch(setInplayBalance(inPlayBalance));

          return response;
        })
        .finally(() => {
          dispatch(isLoading(false));
        });
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};
export const getCommission = () => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .getCommission()
    .then(response => {
      dispatch(setCommission(response));
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

export const fetchWalletDetails = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getWalletAmount()(dispatch)
  ]);
