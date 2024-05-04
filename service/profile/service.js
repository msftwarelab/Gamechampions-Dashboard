import AuthenticatedApiService from "../authenticatedApiService";

export default class PlayerDetailsService extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/players`;
  }
  sendMyAccount({ data }) {
    const url = this.getServiceUrl();
    const id = data.userId;
    return this.put({ url, data, id });
  }
  sendMyBankDetails({ data }) {
    const url = `${this.getServiceUrl()}/${data.userId}/bankdetails`;
    return this.put({ url, data });
  }
}
