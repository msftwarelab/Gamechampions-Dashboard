import MockService from "./service.mock";
import { toNotificationsArray, toNotification } from "./adapter";

export default class Notifications {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get(data).then(response => {
      return toNotificationsArray(response);
    });
  }

  getNotification() {
    return this.service.getNotification().then(response => {
      return toNotification(response);
    });
  }

  getUnread() {
    return this.service.getUnread().then(response => {
      return toNotificationsArray(response);
    });
  }

  update(data) {
    return this.service.put(data).then(response => {
      return response;
    });
  }
}
