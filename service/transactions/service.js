import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/transactions`;
  }

  creditPlayer({ data }) {
    return super.post({
      url: this.getServiceUrl(),
      data
    });
  }

  creditPlayerWithEnergy({ data }) {
    return super.post({
      url: `${super.getServiceUrl()}/admins/CreditFreeMatches`,
      data
    });
  }

  purchaseFreeMatches({ data }) {
    const url = `${this.getServiceUrl()}/purchaseFreeMatches?tournamentId=${
      data.tournamentId
    }&playerId=${data.playerId}`;
    return super.post({
      url,
      data: data.energyPackage
    });
  }
}
