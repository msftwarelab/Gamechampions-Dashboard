import MockService from "./service.mock";
import { toGamerTagsJson } from "./adapter";

export default class GamerTags {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  sendGamerTags(data) {
    return this.service
      .sendGamerTags({ data: toGamerTagsJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
