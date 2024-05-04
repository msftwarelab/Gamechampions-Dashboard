import { toMessageJson, toMessage } from "./adapter";

export default class GlobalChatHub {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service;
  }

  init() {
    return this.service.createConnection();
  }

  getMessages(data, action) {
    const { userId } = data;

    return this.service.getMessages(message =>
      action(toMessage(message, { userId }))
    );
  }

  sendMessage(data) {
    return this.service.sendMessage(toMessageJson(data));
  }
}
