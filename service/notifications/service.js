import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
  }

  getServiceUrl() {
    return `${super.getServiceUrl()}/notifications`;
  }

  get(data) {
    return super.get({
      url: `${this.getServiceUrl()}?page=${data.page}&pageSize=${data.pageSize}`
    });
  }

  getNotification() {
    return super.get({
      url: `${this.getServiceUrl()}/notificationStack`
    });
  }

  getUnread() {
    return super.get({
      url: `${this.getServiceUrl()}/unread`
    });
  }

  put(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.id}/MarkAsRead`
    });
  }
}
