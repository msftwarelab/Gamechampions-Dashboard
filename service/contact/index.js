import { toContactUsJson } from "./adapter";

export default class Service {
  constructor({ service } = {}) {
    this.service = service;
  }

  submit(data) {
    return this.service.submit({ data: toContactUsJson(data) });
  }
}
