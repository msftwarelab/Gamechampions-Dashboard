import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/matches`;
  }
  get({ data }) {
    return super.get({
      url: `${this.getServiceUrl()}/${data.matchId}/chat`
    });
  }

  post({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/${data.matchId}/chat`,
      data
    });
  }
}
