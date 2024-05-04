import MockService from "./service.mock";
import {
  toSendChallengeJson,
  toGameAndRulesArray,
  toSendPlayerChallengeJson
} from "./adapter";

export default class Challenges {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getGamesAndRules(data) {
    return this.service.getGamesAndRules(data).then(response => {
      return toGameAndRulesArray(response);
    });
  }

  sendChallenge(data) {
    return this.service
      .sendCreateChallenge({ data: toSendChallengeJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  sendPlayerChallenge(data) {
    return this.service
      .sendPlayerChallenge({ data: toSendPlayerChallengeJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
