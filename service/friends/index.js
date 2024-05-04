import MockService from "./service.mock";
import {
  toFriends,
  toGetReferrerIdJson,
  toGetReferrerId,
  toSendInviteJson
} from "./adapter";

export default class Friends {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.getAll({ data }).then(response => {
      return toFriends(response);
    });
  }

  getReferrerId(data) {
    return this.service
      .getReferrerId({ data: toGetReferrerIdJson(data) })
      .then(response => toGetReferrerId(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  sendInvite(data) {
    return this.service
      .sendInvite({ data: toSendInviteJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
