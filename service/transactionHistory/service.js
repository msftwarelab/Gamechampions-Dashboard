import PaginatedApiService from "~service/paginatedApiService";

export default class Service extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/Self/transactions`;
  }

  getTransactionHistory(data) {
    return super.get({
      url: `${this.getServiceUrl()}?page=${data?.page}&pageSize=${
        data?.pageSize
      }`
    });
  }
}
