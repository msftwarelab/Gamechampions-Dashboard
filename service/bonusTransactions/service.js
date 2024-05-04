import PaginatedApiService from "~service/paginatedApiService";

export default class Service extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/BonusTransactions`;
  }
  creditBonus({ data }) {
    return super.post({ url: `${this.getServiceUrl()}/AdminCredit`, data });
  }
}
