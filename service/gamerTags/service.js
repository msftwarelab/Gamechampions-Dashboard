import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  sendGamerTags({ data }) {
    return super.put({
      url: `${this.getServiceUrl()}/players/${data.id}/tags`,
      data
    });
  }
}
