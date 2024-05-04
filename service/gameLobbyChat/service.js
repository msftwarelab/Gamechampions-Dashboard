import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/games`;
  }
  get({ data }) {
    const url = `${this.getServiceUrl()}/${data.gameId}/chat`;
    return super.get({ url });
  }
  post({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/${data.gameId}/chat`,
      data
    });
  }
}
