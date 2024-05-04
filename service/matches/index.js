import MockService from "./service.mock";
import {
  toMatches,
  toMatchJson,
  toMatchStatus,
  toMatchLobby,
  toMatchStatusJson,
  toSetScoreAdvantageJson,
  toSetResultJson,
  toStartMatchJson,
  toChallengeJson,
  toSetAdminResultJson,
  toAdminCancelJson,
  toAdminMatches,
  toAdminMatch,
  toCreateAdminMatchJson,
  toMatchStartTimeJson,
  toMatchStartTime,
  toEntryFeeJson
} from "./adapter";

export default class Matches {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  //Self Matches
  get(data) {
    return this.service.get({ data }).then(response => {
      return toMatches(response, data);
    });
  }
  // Match Lobby
  getMatch(data) {
    return this.service
      .getMatch({ data: toMatchJson(data) })
      .then(response => toMatchLobby(response, toMatchJson(data)));
  }

  getMatchStatus(data) {
    return this.service
      .getMatchStatus({ data: toMatchJson(data) })
      .then(response => toMatchStatus(response, data));
  }

  setScoreAdvantage(data) {
    return this.service
      .setScoreAdvantage({ data: toSetScoreAdvantageJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  setResult(data) {
    return this.service
      .setResult({ data: toSetResultJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  setAdminResult(data) {
    return this.service
      .setAdminResult({ data: toSetAdminResultJson(data) })
      .then(response => toAdminMatch(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  startMatch(data) {
    return this.service
      .startMatch({ data: toStartMatchJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  acceptChallenge(data) {
    return this.service
      .acceptChallenge({ data: toChallengeJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  refuseChallenge(data) {
    return this.service
      .refuseChallenge({ data: toChallengeJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  cancelChallenge(data) {
    return this.service
      .cancelChallenge({ data: toChallengeJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  adminCancelChallenge(data) {
    return this.service
      .adminCancelChallenge({ data: toAdminCancelJson(data) })
      .then(response => toAdminMatch(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getAdminMatches(data) {
    return this.service
      .getAdminMatches(data)
      .then(response => toAdminMatches(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  createAdminMatch(data) {
    return this.service
      .createAdminMatch({ data: toCreateAdminMatchJson(data) })
      .then(response => toAdminMatches(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  updateMatchStatus(data) {
    return this.service
      .updateMatchStatus({ data: toMatchStatusJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  reportMissingPlayer(data) {
    return this.service
      .reportMissingPlayer({ data: toMatchStatusJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getMatchStartTime(data) {
    return this.service
      .getMatchStartTime({ data: toMatchStartTimeJson(data) })
      .then(response => toMatchStartTime(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  submitPhotoProof(data) {
    return this.service
      .submitPhotoProof({ data: toMatchStatusJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getEntryFee(data) {
    return this.service
      .getEntryFee({ data: toEntryFeeJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getTournamentsResults(data) {
    return this.service
      .getTournamentsResults(data)
      .then(response => response)
      .catch(error => {
        throw error;
      });
  }
}
