import MockService from "./service.mock";
import { toFile, toFileJson } from "./adapter";

export default class File {
  constructor({ service } = {}) {
    this.service = service || new MockService();
  }

  post(data) {
    return this.service.post({ data: toFileJson(data) }).then(response => {
      return toFile(response);
    });
  }
}
