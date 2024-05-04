import AuthenticatedApiService from "../authenticatedApiService";

export default class ImageService extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/file`;
  }

  post({ data }) {
    return super.post({
      url: this.getServiceUrl(),
      data
    });
  }
}
