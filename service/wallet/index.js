import MockService from "./service.mock";
import {
  toWalletAmountJson,
  toWalletAmount,
  toTransactionJson,
  toNewCardTransactionJson,
  toPayment,
  toConfirmransactionJson,
  toSendWithdrawalEmailJson,
  toWithdrawJSON,
  toCommission,
  toConfirmPaypalTransactionJson,
  toPaymentUrl,
  toPaymentUrlRequestJson,
  toDepositInfo
} from "./adapter";

export default class Wallet {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  init() {
    return this.service.createTagConnection();
  }

  getTagging(action) {
    return this.service.getTagging(depositResponse => {
      // Retrieve the three values from the deposit response
      action(toDepositInfo(depositResponse));
    });
  }

  getWalletAmount(data) {
    return this.service
      .getWalletAmount({ data: toWalletAmountJson(data) })
      .then(response => {
        return toWalletAmount(response);
      });
  }
  getCommission() {
    return this.service
      .getCommission()
      .then(response => toCommission(response));
  }

  confirmTransaction(data) {
    return this.service
      .confirmTransaction({ data: toConfirmransactionJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  createCardAndExecuteTransaction(data) {
    return this.service
      .createCardAndExecuteTransaction({ data: toNewCardTransactionJson(data) })
      .then(response => toPayment(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  executeTransaction(data) {
    return this.service
      .executeTransaction({ data: toTransactionJson(data) })
      .then(response => toPayment(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  sendWithdrawalEmail(data) {
    return this.service
      .sendWithdrawalEmail({ data: toSendWithdrawalEmailJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  submitWithdraw(data) {
    return this.service
      .submitWithdraw(toWithdrawJSON(data))
      .then(response => response);
  }

  confirmPaypalTransaction(data) {
    return this.service
      .confirmPaypalTransaction({ data: toConfirmPaypalTransactionJson(data) })
      .then(response => response)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  requestApcoPayUrl(data) {
    return this.service
      .requestApcoPayUrl({
        data: toPaymentUrlRequestJson(data)
      })
      .then(response => toPaymentUrl(response))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  requestSkrillUrl(data) {
    return this.service
      .requestSkrillUrl({
        data: toPaymentUrlRequestJson(data)
      })
      .then(response => toPaymentUrl(response))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  requestPayPalUrl(data) {
    return this.service
      .requestPayPalUrl({
        data: toPaymentUrlRequestJson(data)
      })
      .then(response => toPaymentUrl(response))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  requestMacroPayUrl(data) {
    return this.service
      .requestMacroPayUrl({
        data: toPaymentUrlRequestJson(data)
      })
      .then(response => toPaymentUrl(response))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}
