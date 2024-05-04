import SessionService from "./service";

export default class Service {
  constructor() {
    this.service = new SessionService();
  }

  create(data) {
    return this.service.create(data).catch(error => {
      console.log(error);
      throw error;
    });
  }

  delete(data) {
    return this.service.delete(data).catch(error => {
      console.log(error);
      throw error;
    });
  }
}
