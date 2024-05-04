import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
  }

  get() {
    return Promise.resolve();
  }

  getBalanceById() {
    return Promise.resolve();
  }

  getById() {
    return Promise.resolve();
  }

  getPlayerTransactions() {
    return Promise.resolve();
  }

  getPlayerMatches() {
    return Promise.resolve();
  }

  completeTransaction() {
    return Promise.resolve();
  }
}
