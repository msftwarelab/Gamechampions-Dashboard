import {
  GAMEID_QUERY_PARAM_NAME,
  NUMBER_OF_DAYS_QUERY_PARAM_NAME
} from "~service/constants";
import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/players`;
  }

  getTournamentRanking(data) {
    let url = `${this.getServiceUrl()}/${
      data.id
    }/tournamentPoints?${GAMEID_QUERY_PARAM_NAME}=${data.gameId}&tournamentId=${
      data.tournamentId
    }`;

    if (data.numberOfDays) {
      url = url + `&${NUMBER_OF_DAYS_QUERY_PARAM_NAME}=${data.numberOfDays}`;
    }

    return super.get({
      url: url
    });
  }

  getTournamentTopHundred(data) {
    let url = `${this.getServiceUrl()}/tournamentRanking?${GAMEID_QUERY_PARAM_NAME}=${
      data.gameId
    }`;

    return super.get({
      url: url
    });
  }

  getTournamentByGameId(data) {
    let url = `${super.getServiceUrl()}/games/${data.gameId}/tournament`;
    if (data.language) {
      url = url + `?language=${data.language}`;
    }

    return super.get({
      url: url
    });
  }

  getTournamentsByGameId(data) {
    let url = `${super.getServiceUrl()}/games/${data.gameId}/tournaments`;
    if (data.language) url = url + `?language=${data.language}`;
    return super.get({ url });
  }

  getActiveTournaments(data) {
    const url = `${super.getServiceUrl()}/Tournament/ActiveTournaments?language=${
      data.language
    }&playerId=${data.playerId}`;
    return super.get({ url });
  }
}
