import { toMessage, toMessageArray, toMessageJson } from "./adapter";
import MockService from "./service.mock";

export default class Friends {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getMessages(data) {
    return this.service
      .get(data)
      .then(response => toMessageArray(response, toMessageJson(data)));
  }

  create(data) {
    return this.service
      .post({ data: toMessageJson(data) })
      .then(response => toMessage(response, toMessageJson(data)));
  }
}
