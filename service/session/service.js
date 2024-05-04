import ApiService from "../apiService";

export default class Service extends ApiService {
  create(data) {
    return super.post({
      url: `/createSession`,
      data
    });
  }

  delete(data) {
    return super.post({
      url: `/deleteSession`,
      data
    });
  }
}
