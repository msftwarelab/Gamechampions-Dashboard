import MockService from "./service.mock";
import { toMyAccountJson } from "./adapter";

export default class Profile {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  sendMyAccount(data) {
    return this.service
      .sendMyAccount({ data: toMyAccountJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  sendMyBankDetails(data) {
    return this.service
      .sendMyBankDetails({ data: toMyAccountJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
