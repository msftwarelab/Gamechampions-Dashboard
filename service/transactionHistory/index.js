import MockService from "./service.mock";
import { toTransactionData } from "./adapter";

export default class TransactionHistory {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getTransactionHistoryData(data) {
    return this.service.getTransactionHistory(data).then(response => {
      return toTransactionData(response);
    });
  }
}
