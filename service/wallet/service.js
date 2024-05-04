import AuthenticatedApiService from "../authenticatedApiService";
import WebSocketService from "~service/webSocketService";
import { HUBS_API_URL } from "~service/constants";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
    this.webSocketService = new WebSocketService();
  }

  getServiceUrl() {
    return `${super.getServiceUrl()}/Wallet`;
  }

  getHubServiceUrl() {
    return HUBS_API_URL;
  }

  createTagConnection() {
    return this.webSocketService.createConnection(this.getHubServiceUrl());
  }

  getTagging(callBack) {
    // return function that needs a call back
    return this.webSocketService.startConnection("DepositSuccess", callBack);
  }

  executeTransaction({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/ExecuteTransaction`,
      data
    });
  }

  createCardAndExecuteTransaction({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/CreateCardAndExecuteTransaction`,
      data
    });
  }

  confirmTransaction({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/ConfirmTransaction`,
      data
    });
  }

  getWalletAmount() {
    return super.get({
      url: `${super.getServiceUrl()}/self/balance`
    });
  }

  getCommission() {
    return super.get({
      url: `${this.getServiceUrl()}/commission`
    });
  }

  sendWithdrawalEmail({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/withdraw`,
      data
    });
  }

  submitWithdraw(data) {
    return super.post({
      url: `${this.getServiceUrl()}/AdminWithdraw`,
      data
    });
  }

  confirmPaypalTransaction({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/ConfirmPaypalTransaction`,
      data
    });
  }

  requestApcoPayUrl({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/RequestApcoPayHostedPage`,
      data
    });
  }

  requestSkrillUrl({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/RequestSkrillHostedPage`,
      data
    });
  }

  requestPayPalUrl({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/RequestPayPalHostedPage`,
      data
    });
  }

  requestMacroPayUrl({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/MPTransaction`,
      data
    });
  }
}
