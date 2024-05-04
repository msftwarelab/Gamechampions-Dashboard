import PaginatedApiService from "../paginatedApiService";

export default class Service extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/Self`;
  }

  get() {
    return super.get({
      url: this.getServiceUrl()
    });
  }

  getCard() {
    return super.get({
      url: `${this.getServiceUrl()}/Card`
    });
  }

  getPoll() {
    return super.get({
      url: `${this.getServiceUrl()}/Poll`
    });
  }

  getBonusTransactions(data) {
    return super.get({
      url: `${this.getServiceUrl()}/bonusTransactions?page=${
        data?.page
      }&pageSize=${data?.pageSize}`
    });
  }

  getReferralLink() {
    return super.get({
      url: `${this.getServiceUrl()}/referralLink`
    });
  }

  requestPaymentMethod() {
    return super.get({
      url: `${this.getServiceUrl()}/paymentprovider`
    });
  }

  getInplayBalance() {
    return super.get({
      url: `${this.getServiceUrl()}/inplaybalance`
    });
  }
}
