import MockService from "./service.mock";
import { toTeamArray } from "./adapter";

export default class Teams {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getTeams(data) {
    return this.service.getTeams(data).then(response => toTeamArray(response));
  }
}
