import MockService from "./service.mock";
import { toTranslation } from "./adapter";
export default class Translations {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get(lang) {
    return this.service.getTranslation({ lang }).then(response => {
      return toTranslation(response);
    });
  }
}
