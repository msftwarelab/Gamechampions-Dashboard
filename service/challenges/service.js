import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
  }
  getGamesAndRules(data) {
    return super.get({
      url: `${super.getServiceUrl()}/games`,
      data
    });
  }

  sendCreateChallenge({ data }) {
    return super.post({
      url: `${super.getServiceUrl()}/matches/challenge`,
      data
    });
  }

  sendPlayerChallenge({ data }) {
    return super.post({
      url: `${super.getServiceUrl()}/matches/challenge?isDirectChallenge=true`,
      data
    });
  }
}
