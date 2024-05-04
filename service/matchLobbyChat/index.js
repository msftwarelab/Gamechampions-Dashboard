import MockService from "./service.mock";
import { toMessage, toMessageArray, toMessageJson } from "./adapter";

export default class MatchLobbyChat {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getMessages(data) {
    return this.service
      .get({ data: toMessageJson(data) })
      .then(response => toMessageArray(response, toMessageJson(data)));
  }

  create(data) {
    return this.service
      .post({ data: toMessageJson(data) })
      .then(response => toMessage(response, toMessageJson(data)));
  }
}
