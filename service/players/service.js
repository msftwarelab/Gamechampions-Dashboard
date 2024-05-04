import PaginatedApiService from "../paginatedApiService";
import {
  PAGE_SIZE_QUERY_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME,
  MATCH_STATUS_PARAM_NAME
} from "../constants";
import { PAGE_SIZE_VALUE } from "~containers/players/constants";
const PAGE_SIZE = 1000;

export default class PlayersService extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/players`;
  }

  get(data) {
    let requestUrl = data
      ? `${this.getServiceUrl()}/search?${PAGE_QUERY_PARAM_NAME}=${
          data.page
        }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
      : `${this.getServiceUrl()}/search?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    return super.get({
      url: requestUrl
    });
  }

  getBalanceById(data) {
    return super.get({
      url: `${this.getServiceUrl()}/${data.id}/balance`
    });
  }

  getById(data) {
    return super.get({
      url: `${this.getServiceUrl()}/${data.id}`
    });
  }

  getPlayerTransactions(data) {
    let requestUrl = data
      ? `${this.getServiceUrl()}/${
          data.id
        }/transactions?${PAGE_QUERY_PARAM_NAME}=${
          data.page
        }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
      : `${this.getServiceUrl()}/?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    requestUrl =
      data && data.type && data.type != 0
        ? `${requestUrl}&type=${data.type}`
        : requestUrl;
    requestUrl =
      data && data.searchTerm
        ? `${requestUrl}&value=${data.searchTerm}`
        : requestUrl;

    return super.get({
      url: requestUrl
    });
  }

  getPlayerBonusTransactions(data) {
    let requestUrl = data
      ? `${this.getServiceUrl()}/${
          data.id
        }//bonustransactions?${PAGE_QUERY_PARAM_NAME}=${
          data.page
        }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
      : `${this.getServiceUrl()}/?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    requestUrl =
      data && data.type && data.type != 0
        ? `${requestUrl}&type=${data.type}`
        : requestUrl;
    requestUrl =
      data && data.searchTerm
        ? `${requestUrl}&value=${data.searchTerm}`
        : requestUrl;

    return super.get({
      url: requestUrl
    });
  }

  getPlayerMatches(data) {
    let requestUrl =
      data && data.page && data.pageSize
        ? `${this.getServiceUrl()}/${
            data.id
          }/matches?${PAGE_QUERY_PARAM_NAME}=${
            data.page
          }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
        : `${this.getServiceUrl()}/?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    requestUrl =
      data && data.searchTerm
        ? `${requestUrl}&${SEARCH_TERM_PARAM_NAME}=${data.searchTerm}`
        : requestUrl;

    requestUrl =
      data && data.type
        ? `${requestUrl}&${MATCH_STATUS_PARAM_NAME}=${data.type}`
        : requestUrl;

    return super.get({
      url: requestUrl
    });
  }

  getPlayerXPPoints(data) {
    return super.get({
      url: `${this.getServiceUrl()}/${data.playerId}/xppoints?gameType=${
        data.gameType
      }`
    });
  }

  getPlayerStats(data) {
    return super.get({
      url: `${this.getServiceUrl()}/${data.playerId}/GetPlayerStats`
    });
  }

  updatePlayerXPPoints(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.playerId}/xppoints`,
      data
    });
  }

  completeTransaction(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.id}/transactions/${
        data.txnId
      }/completeTransaction`
    });
  }
  blockPlayer(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.playerId}/block`,
      data
    });
  }

  unblockPlayer(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.playerId}/unblock`,
      data
    });
  }

  mutePlayer(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.playerId}/mute`,
      data
    });
  }
  unMutePlayer(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.playerId}/unmute`,
      data
    });
  }
  search(data) {
    let requestUrl =
      data && data.page && data.pageSize
        ? `${this.getServiceUrl()}/Search?${PAGE_QUERY_PARAM_NAME}=${
            data.page
          }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
        : `${this.getServiceUrl()}/Search?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE_VALUE}`;

    requestUrl =
      data && data.searchTerm
        ? `${requestUrl}&${SEARCH_TERM_PARAM_NAME}=${data.searchTerm}`
        : requestUrl;

    return super.get({
      url: requestUrl
    });
  }
  updateAdminPlayer({ data }) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.id}/UpdateAdminPlayer`,
      data
    });
  }

  getDuplicatePlayers({ dateFrom, dateTo, email, page, pageSize }) {
    let requestUrl =
      page && pageSize
        ? `${this.getServiceUrl()}/duplicatePlayersIps?${PAGE_QUERY_PARAM_NAME}=${page}&${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`
        : `${this.getServiceUrl()}/duplicatePlayersIps?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    if (email) {
      requestUrl = requestUrl + `&emailName=${email}`;
    }

    if (dateFrom) {
      requestUrl = requestUrl + `&from=${dateFrom}`;
    }
    if (dateTo) {
      requestUrl = requestUrl + `&to=${dateTo}`;
    }

    return super.get({
      url: requestUrl
    });
  }

  getDuplicatePlayersDetail({ from, to, page, pageSize, ipAddress }) {
    let requestUrl =
      page && pageSize
        ? `${this.getServiceUrl()}/ipPlayers?${PAGE_QUERY_PARAM_NAME}=${page}&${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`
        : `${this.getServiceUrl()}/ipPlayers?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    if (from) {
      requestUrl = requestUrl + `&from=${from}`;
    }
    if (to) {
      requestUrl = requestUrl + `&to=${to}`;
    }

    if (ipAddress) {
      requestUrl = requestUrl + `&ipAddress=${ipAddress}`;
    }

    return super.get({
      url: requestUrl
    });
  }

  uploadPlayerDocuments({ data }) {
    let requestUrl = `${this.getServiceUrl()}/${data.id}/uploadDocument`;

    return super.post({
      url: requestUrl,
      data: data.files
    });
  }

  deletePlayerDocument({ playerId, documentId }) {
    let requestUrl = `${this.getServiceUrl()}/${playerId}/deleteDocument/${documentId}`;
    return super.delete({
      url: requestUrl
    });
  }

  validatePlayerDocument(data) {
    let requestUrl = `${this.getServiceUrl()}/AdminValidateDocuments`;
    return super.patch({
      url: requestUrl,
      data: data
    });
  }

  getPlayerBonusCampaignStatus({ playerId }) {
    let requestUrl = `${this.getServiceUrl()}/${playerId}/GetPlayerBonusCampaignStatus`;

    return super.get({
      url: requestUrl
    });
  }

  getPlayerLinkedBonusCampaigns({ playerId }) {
    let requestUrl = `${this.getServiceUrl()}/${playerId}/getLinkedPlayerBonusCampaigns`;

    return super.get({
      url: requestUrl
    });
  }

  assignDefaultGame(data) {
    let requestUrl = `${this.getServiceUrl()}/${
      data.playerId
    }/AssignDefaultGameType?defaultGameType=${data.defaultGameType}&id=${
      data.playerId
    }`;
    return super.patch({
      url: requestUrl
    });
  }
  assignDefaultGameUsername(data) {
    const username =
      data.defaultGameType == 3 ? data.Nba2KAccount : data.EAAccount;
    let requestUrl = `${this.getServiceUrl()}/${
      data.playerId
    }/AssignDefaultGameUsername?username=${username}&defaultGameType=${
      data.defaultGameType
    }&id=${data.playerId}`;
    return super.patch({
      url: requestUrl,
      data: data
    });
  }
  claimWelcomeBonus(data) {
    let requestUrl = `${this.getServiceUrl()}/${
      data.playerId
    }/ClaimWelcomeBonus&id=${data.playerId}`;
    return super.patch({
      url: requestUrl
    });
  }
}
