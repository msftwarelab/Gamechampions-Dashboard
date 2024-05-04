import MockService from "./service.mock";
import {
  toGetPlayerDetailsJson,
  toGetPlayerMatches,
  toPlayer
} from "./adapter";

export default class PlayerDetails {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getPlayerMatches(data) {
    return this.service
      .getPlayerMatches({ data: toGetPlayerDetailsJson(data) })
      .then(response => {
        return toGetPlayerMatches(response, toGetPlayerDetailsJson(data));
      });
  }

  getGamerTags(data) {
    return this.service
      .getGamerTags({ data: toGetPlayerDetailsJson(data) })
      .then(response => {
        return toPlayer(response);
      });
  }
}
