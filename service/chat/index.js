import MockService from "./service.mock";
import {
  toMessageArray,
  toMessageJson,
  toChatMessagesJson,
  toMessage,
  toPersonalMessages
} from "./adapter";

export default class Chat {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getMessages(data) {
    data = toChatMessagesJson(data);
    return this.service
      .get(data)
      .then(response => toMessageArray(response, data));
  }

  create(data) {
    data = toMessageJson(data);
    return this.service
      .post(data)
      .then(response => toMessage(response, data.senderId));
  }

  lastMessageRead(id) {
    return this.service.markAsRead(id).then(response => response);
  }

  getPersonalMessages() {
    return this.service
      .getPersonalMessages()
      .then(response => toPersonalMessages(response));
  }
}
