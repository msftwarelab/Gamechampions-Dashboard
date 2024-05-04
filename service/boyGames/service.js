import AuthenticatedApiService from "../authenticatedApiService";

export default class BoyGamesService extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/BoyGames`;
  }

  getBoyGames({ selectedLanguage }) {
    return super.get({
      url: `${this.getServiceUrl()}?language=${selectedLanguage}`
    });
  }

  getBoyQuickLinks({ selectedLanguage }) {
    return super.get({
      url: `${this.getServiceUrl()}/GetQuickLinks?language=${selectedLanguage}`
    });
  }

  getDashboardFooter({ selectedLanguage }) {
    return super.get({
      url: `${this.getServiceUrl()}/GetDashboardFooter?language=${selectedLanguage}`
    });
  }
}
