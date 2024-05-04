import { REDUCER_NAME, SET_AMOUNT } from "./constants";
import Api from "../../../../service/main";
import { renderPage, getPage } from "../page/actions";
import { transformApiMessages } from "../../util/errorMessages";

export const setAmount = data => ({
  type: SET_AMOUNT,
  data
});

export const submitWithdraw = data =>
  Api.wallet
    .sendWithdrawalEmail(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });

export const fetchWithdrawal = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);

export const getWithdrawApiErrorMessage = apiErrorResponse =>
  transformApiMessages(apiErrorResponse, () => ({}));
