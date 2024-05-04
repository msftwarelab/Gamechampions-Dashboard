import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/Translations`;
  }

  getTranslation({ lang }) {
    return super.get({
      url: `${this.getServiceUrl()}?language=${lang}`
    });
  }
}
