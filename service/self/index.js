import MockService from "./service.mock";
import {
  toCard,
  toPlayerProfile,
  toAdminProfile,
  toPoll,
  toBonusTransactionsData,
  toReferralLink,
  toPaymentProviders,
  toInplayBalance
} from "./adapter";
import { ROLES } from "~service/constants";

export default class Self {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get() {
    return this.service.get().then(response => {
      if (response) {
        switch (response.role) {
          case ROLES.ADMIN:
            return toAdminProfile(response);
          case ROLES.PLAYER:
            return toPlayerProfile(response);
          default:
            break;
        }
      }

      return null;
    });
  }

  getCard() {
    return this.service.getCard().then(response => {
      return toCard(response);
    });
  }

  getPoll() {
    return this.service.getPoll().then(response => toPoll(response));
  }

  getBonusTransactionHistory(data) {
    return this.service
      .getBonusTransactions(data)
      .then(response => toBonusTransactionsData(response));
  }

  getReferralLink() {
    return this.service
      .getReferralLink()
      .then(response => toReferralLink(response));
  }

  requestPaymentMethod(data) {
    return this.service
      .requestPaymentMethod({
        data: data
      })
      .then(response => toPaymentProviders(response))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  getInplayBalance() {
    return this.service.getInplayBalance().then(toInplayBalance);
  }
}
