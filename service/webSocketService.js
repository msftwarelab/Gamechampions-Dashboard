import { HubConnectionBuilder } from "@microsoft/signalr";
import { HUBS_API_URL } from "./constants";

export default class WebSocketService {
  createConnection(url) {
    if (this.connection && this.connection.connectionStarted)
      return new Promise((res, rej) => {
        rej("Connection is already created! ");
      });

    this.connection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    return this.connection.start();
  }
  startConnection(channel, callBack) {
    return this.connection.on(channel, callBack);
  }
  post(task, data) {
    if (!this.connection.connectionStarted)
      return new Promise((res, rej) => {
        rej("Message could not be sent!");
      });

    return this.connection.send(task, data);
  }

  getHubServiceUrl() {
    return HUBS_API_URL;
  }
}
