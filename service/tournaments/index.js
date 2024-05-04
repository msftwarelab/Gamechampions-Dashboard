import {
  toPlayerTournamentRankingArray,
  toTournamentItems,
  toTournamentItem,
  toActiveTournamentsArray,
  toActiveTournamentJSON
} from "./adapter";

export default class Tournamnets {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service;
  }

  getTournamentRanking(data) {
    return this.service
      .getTournamentRanking(data)
      .then(response => toPlayerTournamentRankingArray(response))
      .catch(error => {
        throw error;
      });
  }

  getTournamentTopHundred(data) {
    return this.service
      .getTournamentTopHundred(data)
      .then(response => toPlayerTournamentRankingArray(response))
      .catch(error => {
        throw error;
      });
  }

  getTournament(data) {
    return this.service
      .getTournamentByGameId(data)
      .then(response => toTournamentItem(response))
      .catch(error => {
        throw error;
      });
  }

  getTournamentsList(data) {
    return this.service
      .getTournamentsByGameId(data)
      .then(response => toTournamentItems(response))
      .catch(error => {
        throw error;
      });
  }

  getActiveTournaments(data) {
    return this.service
      .getActiveTournaments(toActiveTournamentJSON(data))
      .then(response => toActiveTournamentsArray(response))
      .catch(error => {
        throw error;
      });
  }
}
