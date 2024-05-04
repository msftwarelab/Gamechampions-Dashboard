import AuthenticatedApiService from "../authenticatedApiService";
import { MATCH_STATUS } from "~containers/matchLobby/constants";
import { PAGE_SIZE_QUERY_PARAM_NAME } from "~service/constants";
const PAGE_SIZE = 10;

export default class PlayerDetailsService extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/players`;
  }

  getPlayerMatches({ data }) {
    let { pageSize = PAGE_SIZE } = data;
    if (data.gameId) {
      return super.get({
        url: `${this.getServiceUrl()}/${data.id}/matches`,
        data: {
          state: MATCH_STATUS.COMPLETED,
          gameId: data.gameId,
          [PAGE_SIZE_QUERY_PARAM_NAME]: pageSize
        }
      });
    } else {
      return super.get({
        url: `${this.getServiceUrl()}/${data.id}/matches`,
        data: {
          state: MATCH_STATUS.COMPLETED,
          [PAGE_SIZE_QUERY_PARAM_NAME]: pageSize
        }
      });
    }
  }
  getGamerTags({ data }) {
    return super.get({
      url: this.getServiceUrl(),
      id: data.id
    });
  }
}
