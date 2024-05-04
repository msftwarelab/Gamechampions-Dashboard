import ApiService from "../apiService";

export default class Service extends ApiService {
  changeLanguage(data) {
    return super.post({
      url: "/changeLanguage",
      data
    });
  }
}
