import MockService from "./service.mock";
import { toLanguagesArray } from "./adapter";

export default class MultiLanguage {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get() {
    return this.service.get().then(response => {
      return toLanguagesArray(response);
    });
  }
}
