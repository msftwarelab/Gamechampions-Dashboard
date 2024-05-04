import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/countries`;
  }

  get() {
    const url = `${this.getServiceUrl()}`;
    return super.get({ url });
  }
}
