import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/contact`;
  }

  submit({ data }) {
    return this.post({ data, url: `${this.getServiceUrl()}/submit` });
  }
}
