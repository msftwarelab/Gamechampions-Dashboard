import MockService from "./service.mock";
import { toCreditEnergyJSON, toCreditJson, toEnergyPackage } from "./adapter";

export default class Transactions {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  creditPlayer(data) {
    return this.service
      .creditPlayer({ data: toCreditJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  creditPlayerWithEnergy(data) {
    return this.service
      .creditPlayerWithEnergy({ data: toCreditEnergyJSON(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  purchaseFreeMatches(data) {
    return this.service
      .purchaseFreeMatches({ data: toEnergyPackage(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
