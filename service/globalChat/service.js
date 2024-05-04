import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/globalChat`;
  }
  get(data) {
    return super.get({
      url: `${this.getServiceUrl()}/gameType?gameType=${data?.gameType}`
    });
  }

  post({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/gameType?gameType=${data?.gameType}`,
      data
    });
  }
}
