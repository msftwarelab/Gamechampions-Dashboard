import MockService from "./service.mock";
import { toDayCountArray, toPlayWinArray, toDaySumArray } from "./adapter";

export default class GamerTags {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getRegisteredPlayerCount(data) {
    return this.service
      .getRegisteredPlayerCount(data)
      .then(response => response);
  }

  getDepositCount(data) {
    return this.service.getDepositCount(data).then(response => response);
  }

  getDepositSum(data) {
    return this.service.getDepositSum(data).then(response => response);
  }

  getActivePlayers(data) {
    return this.service.getActivePlayers(data).then(response => response);
  }

  getPlayerWins(data) {
    return this.service
      .getPlayerWins(data)
      .then(response => toPlayWinArray(response));
  }

  getMatchesPlayed(data) {
    return this.service
      .getMatchesPlayed(data)
      .then(response => toDayCountArray(response));
  }

  getPlayerRegistrations(data) {
    return this.service
      .getPlayerRegistrations(data)
      .then(response => toDayCountArray(response));
  }

  getPlayerDeposits(data) {
    return this.service
      .getPlayerDeposits(data)
      .then(response => toDayCountArray(response));
  }

  getMessagesSent(data) {
    return this.service
      .getMessagesSent(data)
      .then(response => toDayCountArray(response));
  }

  getInstantMatches(data) {
    return this.service
      .getInstantMatches(data)
      .then(response => toDayCountArray(response));
  }

  getMatchCommissions(data) {
    return this.service
      .getMatchCommissions(data)
      .then(response => toDaySumArray(response));
  }

  getMatchPrizes(data) {
    return this.service
      .getMatchPrizes(data)
      .then(response => toDaySumArray(response));
  }
}
