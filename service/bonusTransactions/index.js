import {
  toBonusTransaction,
  toBonusTransactionJson
} from "~service/self/adapter";
import MockService from "./service.mock";

export default class bonusCampaigns {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }
  creditBonus(data) {
    return this.service
      .creditBonus({ data: toBonusTransactionJson(data) })
      .then(response => toBonusTransaction(response));
  }
}
