import { toUserMailJson } from "./adapter";

export default class Service {
  constructor({ service } = {}) {
    this.service = service;
  }

  addUserMail(data) {
    return this.service.addUserMail({ data: toUserMailJson(data) });
  }
}
