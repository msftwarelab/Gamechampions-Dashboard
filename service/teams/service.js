import AuthenticatedApiService from "../authenticatedApiService";
import { GAMEID_QUERY_PARAM_NAME } from "~service/constants";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
  }
  getServiceUrl() {
    return `${super.getServiceUrl()}/teams`;
  }

  getTeams(data) {
    return super.get({
      url: `${this.getServiceUrl()}?${GAMEID_QUERY_PARAM_NAME}=${data?.gameId}`
    });
  }
}
