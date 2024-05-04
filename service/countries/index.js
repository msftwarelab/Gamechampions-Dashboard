import MockService from "./service.mock";
import { toCountries } from "./adapter";

export default class GamerTags {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get() {
    return this.service
      .get()
      .then(response => toCountries(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
