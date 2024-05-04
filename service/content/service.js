import AuthenticatedApiService from "../authenticatedApiService";
export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/content`;
  }

  getHowToPlay(data = { language: "en" }) {
    let { language } = data;
    return super.get({
      url: `${this.getServiceUrl()}/welcome?lang=${language}`
    });
  }
}
