import MockService from "./service.mock";

export default class ConfigService {
  constructor({ service } = {}) {
    this.service = service || new MockService();
  }

  getBrandConfig() {
    return this.service.get().then(response => response);
  }
}
