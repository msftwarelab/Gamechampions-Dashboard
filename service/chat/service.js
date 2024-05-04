import AuthenticatedApiService from "../authenticatedApiService";
export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/chat/messages`;
  }

  get(data) {
    return super.get({
      url: this.getServiceUrl(),
      id: `${data.userId}/${data.friendId}`
    });
  }

  post(data) {
    return super.post({
      url: this.getServiceUrl(),
      data
    });
  }

  markAsRead(id) {
    return super.get({
      url: `${super.getServiceUrl()}/chat/${id}/markasread`
    });
  }

  getPersonalMessages() {
    return super.get({
      url: `${super.getServiceUrl()}/chat/PersonalMessages`
    });
  }
}
