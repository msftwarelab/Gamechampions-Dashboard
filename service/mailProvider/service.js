import ApiService from "../apiService";

export default class Service extends ApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/mailProvider`;
  }

  addUserMail({ data }) {
    return this.post({ data, url: `${this.getServiceUrl()}/addUserMail` });
  }
}
