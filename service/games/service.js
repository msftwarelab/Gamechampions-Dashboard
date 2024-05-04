import PaginatedApiService from "../paginatedApiService";
import {
  PAGE_SIZE_QUERY_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME
} from "../constants";
const PAGE_SIZE = 1000;

export default class GamesService extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/games`;
  }

  get(data) {
    let requestUrl = data
      ? `${this.getServiceUrl()}/?${PAGE_QUERY_PARAM_NAME}=${
          data.page
        }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
      : `${this.getServiceUrl()}/?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    return super.get({
      url: requestUrl
    });
  }

  getGame({ data }) {
    let { language, gameId } = data;
    language = language ? language : "en";
    let url = `${this.getServiceUrl()}/${gameId}?language=${language}`;
    return super.get({
      url
    });
  }

  getRecentPlayers(data) {
    let url = `${this.getServiceUrl()}/${
      data.gameType
    }/recentplayers?gameType=${data.gameType}&tournamentId=${
      data.tournamentId
    }`;
    return super.get({
      url
    });
  }

  getInstantMatches({ data }) {
    return super.get({
      id: `${data.gameId}/InstantMatches`,
      url: this.getServiceUrl()
    });
  }

  getLeaderBoards({ data }) {
    return super.get({
      id: `${data.gameId}/rankings`,
      url: this.getServiceUrl()
    });
  }

  getGameTickerMatches({ data }) {
    return super.get({
      id: `${data.gameId}/TickerMatches`,
      url: this.getServiceUrl()
    });
  }

  search(data) {
    let requestUrl = `${this.getServiceUrl()}/Search?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;
    requestUrl =
      data && data.searchTerm
        ? `${requestUrl}&${SEARCH_TERM_PARAM_NAME}=${data.searchTerm}`
        : requestUrl;
    return super.get({
      url: requestUrl
    });
  }

  sendCreateGame({ data }) {
    return super.post({
      url: this.getServiceUrl(),
      data
    });
  }

  sendDeleteGame({ id }) {
    return super.delete({
      url: `${this.getServiceUrl()}/${id}`
    });
  }

  getTournamentPointsTable() {
    return super.get({
      url: `${this.getServiceUrl()}/tournamentsPointsTable`
    });
  }

  getRotatingBanners(data) {
    return super.get({
      url: `${this.getServiceUrl()}/rotatingBanners?${data.selectedLanguage}`
    });
  }

  getOffers(data) {
    return super.get({
      url: `${this.getServiceUrl()}/offers?language=${data.selectedLanguage}`
    });
  }

  getGoMaps() {
    let url = `${this.getServiceUrl()}/getgomaps`;
    return super.get({
      url
    });
  }
}
