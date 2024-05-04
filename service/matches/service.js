import { PAGE_SIZE } from "~containers/notifications/constants";
import { MATCHES_PAGE_SIZE_VALUE } from "~containers/players/constants";
import {
  MATCH_STATUS_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME,
  MATCH_FILTER_BY_ADMIN_MATCH_MADE,
  SEARCH_ID_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME,
  BOY_MATCH_STATUS_PARAM_NAME
} from "~service/constants";
import PaginatedApiService from "../paginatedApiService";

export default class Service extends PaginatedApiService {
  constructor() {
    super();
  }

  getServiceUrl() {
    return `${super.getServiceUrl()}/matches`;
  }

  get({ data }) {
    if (data && data.userId) {
      let requestUrl = `${super.getServiceUrl()}/players/${
        data.userId
      }/matches?${
        data.page && data.pageSize
          ? `${PAGE_QUERY_PARAM_NAME}=${data.page}&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
          : `${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`
      }&language=${data.selectedLanguage}`;
      requestUrl =
        data && data.searchTerm
          ? `${requestUrl}&${SEARCH_TERM_PARAM_NAME}=${data.searchTerm}`
          : requestUrl;

      requestUrl =
        data && data.type
          ? `${requestUrl}&${BOY_MATCH_STATUS_PARAM_NAME}=${data.type}`
          : requestUrl;

      return super.get({
        url: requestUrl
      });
    } else {
      return [];
    }
  }

  getMatch({ data }) {
    return super.get({
      url: `${this.getServiceUrl()}/GetByGuid/${data.matchId}`
    });
  }

  getMatchStatus({ data }) {
    if (data) {
      return super.get({
        url: `${this.getServiceUrl()}/${data.matchId}/status`
      });
    }
  }

  setScoreAdvantage({ data }) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.matchId}/setscoreadvantage`,
      data
    });
  }

  setResult({ data }) {
    if (
      data &&
      data.matchId &&
      (!isNaN(data.challengerFinalScore) || !isNaN(data.defenderFinalScore))
    ) {
      return super.put({
        url: `${this.getServiceUrl()}/${data.matchId}/setresult`,
        data
      });
    }
  }

  setAdminResult({ data }) {
    if (
      data &&
      data.matchId &&
      (!isNaN(data.challengerFinalScore) || !isNaN(data.defenderFinalScore))
    ) {
      return super.put({
        url: `${this.getServiceUrl()}/${data.matchId}/setadminresult`,
        data
      });
    }
  }

  acceptChallenge({ data }) {
    if (data) {
      return super.put({
        url: `${this.getServiceUrl()}/${data.matchId}/acceptchallenge`
      });
    }
  }
  refuseChallenge({ data }) {
    if (data) {
      return super.put({
        url: `${this.getServiceUrl()}/${data.matchId}/refusechallenge`
      });
    }
  }
  cancelChallenge({ data }) {
    if (data) {
      return super.put({
        url: `${this.getServiceUrl()}/${data.matchId}/cancelchallenge`
      });
    }
  }

  adminCancelChallenge({ data }) {
    if (data) {
      return super.put({
        url: `${this.getServiceUrl()}/${data.matchId}/adminCancelChallenge`
      });
    }
  }

  getAdminMatches(data) {
    const {
      page = 1,
      pageSize = MATCHES_PAGE_SIZE_VALUE,
      type,
      filterByMatchMade,
      searchId
    } = data;
    let url = `${this.getServiceUrl()}/search?${PAGE_QUERY_PARAM_NAME}=${page}&${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`;

    if (type) {
      url = url + `&${MATCH_STATUS_PARAM_NAME}=${data.type}`;
    }

    if (filterByMatchMade) {
      url = url + `&${MATCH_FILTER_BY_ADMIN_MATCH_MADE}=${filterByMatchMade}`;
    }

    if (searchId) {
      url = url + `&${SEARCH_ID_PARAM_NAME}=${searchId}`;
    }

    return super.get({
      url: url
    });
  }

  startMatch({ data }) {
    if (data) {
      return super.put({
        url: `${this.getServiceUrl()}/${data.matchId}/startmatch`
      });
    }
  }

  createAdminMatch({ data }) {
    if (data) {
      return super.post({
        url: `${super.getServiceUrl()}/matches/matchmaking`,
        data
      });
    }
  }

  updateMatchStatus({ data }) {
    if (data && data.matchId && data.action) {
      return super.post({
        url: `${this.getServiceUrl()}/${data.matchId}/setscoreadvantage`,
        data
      });
    }
  }

  submitPhotoProof({ data }) {
    if (data && data.matchId) {
      return super.post({
        url: `${this.getServiceUrl()}/${data.matchId}/submitClaimWin`,
        data
      });
    }
  }

  getMatchStartTime({ data }) {
    if (data) {
      return super.get({
        url: `${this.getServiceUrl()}/${data.matchId}/`
      });
    }
  }

  reportMissingPlayer({ data }) {
    if (data && data.matchId) {
      return super.get({
        url: `${this.getServiceUrl()}/${data.matchId}/reportMissingPlayer`
      });
    }
  }

  getEntryFee({ data }) {
    // return Promise.resolve(data.prize / 2);
    if (data) {
      return super.get({
        url: `${this.getServiceUrl()}/entryFee`,
        data
      });
    }
  }

  getTournamentsResults(data) {
    const url = `${this.getServiceUrl()}/TournamentHistoricalMatches/${
      data.tournamentId
    }?tournamentId=${data.tournamentId}&page=${data.page}&pageSize=${
      data.pageSize
    }`;
    return super.get({ url });
  }
}
