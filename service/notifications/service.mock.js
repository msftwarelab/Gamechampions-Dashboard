import AuthenticatedApiService from "../authenticatedApiService";
import { NOTIFICATION_TYPE } from "~containers/notifications/constants";

export default class MockService extends AuthenticatedApiService {
  constructor() {
    super();
    this.counter = 0;
    this.notifications = [
      {
        id: 1001,
        title: "New challenge",
        type: NOTIFICATION_TYPE.MATCH,
        thumbnail: "",
        message: "A new challenge has been requested",
        actionId: 10,
        isRead: true
      },
      {
        id: 1002,
        title: "New challenge",
        type: NOTIFICATION_TYPE.MATCH,
        thumbnail: "",
        message: "A new challenge has been requested",
        actionId: 10,
        isRead: false
      },
      {
        id: 1003,
        title: "New Payer",
        type: NOTIFICATION_TYPE.PLAYER,
        thumbnail: "",
        message: "A new player contact you",
        actionId: 10,
        isRead: false
      },
      {
        id: 1004,
        title: "New challenge",
        type: NOTIFICATION_TYPE.MATCH,
        thumbnail: "",
        message: "A new challenge has been requested",
        actionId: 10,
        isRead: false
      },
      {
        id: 1005,
        title: "New Payer",
        type: NOTIFICATION_TYPE.PLAYER,
        thumbnail: "",
        message: "A new player contact you",
        actionId: 10,
        isRead: true
      },
      {
        id: 1006,
        title: "New Payer",
        type: NOTIFICATION_TYPE.PLAYER,
        thumbnail: "",
        message: "A new player contact you",
        actionId: 10,
        isRead: true
      }
    ];
  }

  getNotification() {
    const notification = this.notifications[0];
    notification.message += ++this.counter;
    notification.id += ++this.counter;

    return Promise.resolve(notification);
  }

  getAll() {
    return Promise.resolve(this.notifications);
  }

  setAsRead(notification) {
    var notif = this.notifications.find(n => (n.id = notification.id));
    notif.isRead = true;
    return Promise.resolve(notif);
  }
}
