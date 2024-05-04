import WebSocketService from "~service/webSocketService";

export default class Service extends WebSocketService {
  connectionUrl() {
    return `${super.getHubServiceUrl()}globalChat`;
  }

  createConnection() {
    return super.createConnection(this.connectionUrl());
  }

  getMessages(callBack) {
    // return function that needs a call back
    return this.startConnection("ReceiveMessage", callBack);
  }

  sendMessage(data) {
    return this.post("SendMessage", data);
  }
}
