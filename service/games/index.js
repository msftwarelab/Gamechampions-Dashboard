import MockService from "./service.mock";
import {
  toGames,
  toTickerMatchArray,
  toInstantMatchArray,
  toGameJson,
  toGame,
  toLeaderBoardItemArray,
  toGameWithRules,
  toSendGameJson,
  toGameCreated,
  toRecentPlayers,
  toTournamentPointsTableArray,
  toGoMaps
} from "./adapter";

export default class Games {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get(data).then(response => toGames(response));
  }

  getGame(data) {
    return this.service
      .getGame({ data: toGameJson(data) })
      .then(response => toGame(response));
  }

  getLeaderBoards(data) {
    return this.service
      .getLeaderBoards({ data: toGameJson(data) })
      .then(response => toLeaderBoardItemArray(response));
  }

  getRecentPlayers(data) {
    return this.service
      .getRecentPlayers(data)
      .then(response => toRecentPlayers(response));
  }
  getGameTickerMatches(data) {
    return this.service
      .getGameTickerMatches({ data: toGameJson(data) })
      .then(response => toTickerMatchArray(response));
  }

  getInstantMatches(data) {
    return this.service
      .getInstantMatches({ data: toGameJson(data) })
      .then(response => toInstantMatchArray(response));
  }

  getGameRules(data) {
    return this.service
      .getGameRules({ data: toGameJson(data) })
      .then(response => toGameWithRules(response));
  }

  search(data) {
    return this.service.search(data).then(response => toGames(response));
  }

  createGame(data) {
    return this.service
      .sendCreateGame({ data: toSendGameJson(data) })
      .then(response => toGameCreated(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  deleteGame(data) {
    return this.service
      .sendDeleteGame({ id: data.id })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getTournamentPointsTable() {
    return this.service
      .getTournamentPointsTable()
      .then(response => toTournamentPointsTableArray(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getRotatingBanners(data) {
    return this.service
      .getRotatingBanners(data)
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getOffers(data) {
    return this.service
      .getOffers(data)
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getGoMaps() {
    return this.service.getGoMaps().then(response => {
      return toGoMaps(response);
    });
  }
}
