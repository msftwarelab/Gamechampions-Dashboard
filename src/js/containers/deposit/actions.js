import {
  DEPOSIT_LOADING,
  SET_AMOUNT,
  SET_CARD,
  RESET_CARD,
  REDUCER_NAME,
  SET_DEPOSIT_ERROR,
  RESET_DEPOSIT_ERROR,
  SET_SUCCESSFUL_PAYMENT,
  RESET_SUCCESSFUL_PAYMENT,
  SET_PAYMENT_PROVIDER,
  SET_PAYMENT_REFERENCE,
  SET_BONUS_VALUES,
  SET_PROVIDER_URL,
  RESET_PROVIDER_URL,
  SET_PROMO_CODE,
  SET_IS_CONNECTION_CREATED,
  SET_DEPOSIT_INFO
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "~service/main";
import { getCommission } from "~containers/wallet/actions";

const isLoading = data => ({
  type: DEPOSIT_LOADING,
  data
});

export const setError = data => ({
  type: SET_DEPOSIT_ERROR,
  data: getApiErrorMessage(data)
});

export const resetError = data => ({
  type: RESET_DEPOSIT_ERROR,
  data
});

export const setSuccessfulPayment = data => ({
  type: SET_SUCCESSFUL_PAYMENT,
  data
});

export const setTagConnectionCreated = data => ({
  type: SET_IS_CONNECTION_CREATED,
  data
});

export const setPromoCode = data => ({
  type: SET_PROMO_CODE,
  data
});

export const setProviderUrl = data => ({
  type: SET_PROVIDER_URL,
  data
});

export const resetProviderUrl = data => ({
  type: RESET_PROVIDER_URL,
  data
});

export const setPaymentProvider = data => ({
  type: SET_PAYMENT_PROVIDER,
  data
});

export const resetSuccessfulPayment = data => ({
  type: RESET_SUCCESSFUL_PAYMENT,
  data
});

export const setAmount = data => ({
  type: SET_AMOUNT,
  data
});

export const setDepositInfo = data => ({
  type: SET_DEPOSIT_INFO,
  data
});

export const resetCard = () => ({
  type: RESET_CARD
});

export const setCard = data => ({
  type: SET_CARD,
  data
});

export const setPaymentReference = data => ({
  type: SET_PAYMENT_REFERENCE,
  data
});

export const setBonusValues = data => ({
  type: SET_BONUS_VALUES,
  data
});

const getApiErrorMessage = error => {
  switch (error) {
    case "WalletErrorCardTokenFailed":
    case "WalletErrorCardCreateFailed":
      return "DepositErrorCardFailed";
    case "WalletErrorPaymentFailed":
    case "WalletErrorTransactionBadReference":
    case "WalletErrorPaymentNotFound":
      return "DepositErrorPaymentFailed";
    case "WalletErrorClientTokenFailed":
      return "DepositErrorClientTokenFailed";
    default:
      return "GenericError";
  }
};

const generateCardToken = ({
  cardNumber,
  cardHolderFullName,
  expirationDate,
  cvc
}) => {
  return new Promise((resolve, reject) => {
    // This is not required for production usage
    window.syspay.tokenizer.setBaseUrl(process.env.SYSPAY_PUBLIC_URL);
    // The public key can be found from your merchant backend
    window.syspay.tokenizer.setPublicKey(process.env.SYSPAY_PUBLIC_KEY);

    window.syspay.tokenizer.tokenizeCard(
      {
        number: cardNumber,
        cardholder: cardHolderFullName,
        exp_month: expirationDate?.substring(0, 2),
        exp_year: "20" + expirationDate?.substring(3, 5),
        cvc
      },
      response => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      }
    );
  });
};

export const getCard = () => dispatch => {
  dispatch(isLoading(true));
  dispatch(resetCard());
  return Api.self
    .getCard()
    .then(response => {
      dispatch(setCard(response));
      dispatch(isLoading(false));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const initTagHub = () => dispatch =>
  Api.wallet
    .init()
    .then(() => dispatch(setTagConnectionCreated(true)))
    .catch(e => console.log(e));

export const getTagging = () => dispatch => {
  return Api.wallet.getTagging(response => {
    dispatch(setDepositInfo(response));
  });
};

export const getBonusValues = () => dispatch => {
  dispatch(isLoading(true));
  return Api.bonusCampaigns
    .getBonusAvailable()
    .then(response => {
      dispatch(setBonusValues(response));
      dispatch(isLoading(false));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const executeTransaction = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .executeTransaction(data)
    .then(apiResponse => {
      if (apiResponse.isSuccessfulPayment) {
        dispatch(isLoading(false));
        dispatch(setSuccessfulPayment(true));
        dispatch(setPaymentReference(apiResponse.paymentReference));
      } else {
        window.location.href = apiResponse.threeDsUrl;
      }
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const confirmTransaction = data => dispatch => {
  dispatch(isLoading(true));

  return Api.wallet
    .confirmTransaction(data)
    .then(() => {
      dispatch(isLoading(false));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const confirmPaypalTransaction = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .confirmPaypalTransaction(data)
    .then(() => {
      dispatch(isLoading(false));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const requestApcoPayUrl = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .requestApcoPayUrl(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setProviderUrl(response.transactionURL));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const requestSkrillUrl = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .requestSkrillUrl(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setProviderUrl(response.transactionURL));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const requestPayPalUrl = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .requestPayPalUrl(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setProviderUrl(response.transactionURL));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const requestMacroPayUrl = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .requestMacroPayUrl(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setProviderUrl(response.transactionURL));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const requestPaymentMethod = data => dispatch => {
  dispatch(isLoading(true));
  return Api.self
    .requestPaymentMethod(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setPaymentProvider(response));
    })
    .catch((error = {}) => {
      dispatch(isLoading(false));
      dispatch(setError(error.data));
    });
};

export const createCardAndExecuteTransaction = data => dispatch => {
  dispatch(isLoading(true));

  return generateCardToken(data)
    .then(response => {
      return Api.wallet
        .createCardAndExecuteTransaction({ ...data, ...response })
        .then(apiResponse => {
          if (apiResponse.isSuccessfulPayment) {
            dispatch(isLoading(false));
            dispatch(setSuccessfulPayment(true));
            dispatch(setPaymentReference(apiResponse.paymentReference));
          } else {
            window.location.href = apiResponse.threeDsUrl;
          }
        })
        .catch((error = {}) => {
          dispatch(isLoading(false));
          dispatch(setError(error.data));
        });
    })
    .catch(() => {
      dispatch(isLoading(false));
      dispatch(setError("WalletErrorClientTokenFailed"));
    });
};

export const fetchDeposit = ({ pageData, requestData }) => dispatch => {
  const { paymentReference } = requestData;

  var promiseArr = [
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getCard()(dispatch),
    getCommission()(dispatch),
    getBonusValues()(dispatch)
  ];

  if (paymentReference) {
    promiseArr.push(confirmTransaction(requestData)(dispatch));
  }

  return Promise.all(promiseArr);
};
