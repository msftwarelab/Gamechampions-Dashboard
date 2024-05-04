import { toContent } from "./adapter";
import MockService from "./service.mock";

export default class Content {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getHowToPlay(data) {
    return this.service
      .getHowToPlay(data)
      .then(response => toContent(response));
  }
}
