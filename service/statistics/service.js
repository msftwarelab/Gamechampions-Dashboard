import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/statistics`;
  }

  getRegisteredPlayerCount(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/RegisteredPlayerCount?from=${from}&to=${to}`
    });
  }

  getDepositCount(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/DepositCount?from=${from}&to=${to}`
    });
  }

  getDepositSum(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/DepositSum?from=${from}&to=${to}`
    });
  }

  getActivePlayers(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/ActivePlayers?from=${from}&to=${to}`
    });
  }

  getPlayerWins(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/PlayerWins?from=${from}&to=${to}`
    });
  }

  getMatchesPlayed(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/MatchesPlayed?from=${from}&to=${to}`
    });
  }

  getPlayerRegistrations(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/PlayerRegistrations?from=${from}&to=${to}`
    });
  }

  getPlayerDeposits(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/PlayerDeposits?from=${from}&to=${to}`
    });
  }

  getMessagesSent(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/MessagesSent?from=${from}&to=${to}`
    });
  }

  getInstantMatches(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/InstantMatches?from=${from}&to=${to}`
    });
  }

  getMatchCommissions(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/MatchCommissions?from=${from}&to=${to}`
    });
  }

  getMatchPrizes(data) {
    const { from, to } = data;
    return super.get({
      url: `${this.getServiceUrl()}/MatchPrizes?from=${from}&to=${to}`
    });
  }
}
