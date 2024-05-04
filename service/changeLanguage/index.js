import LanguageService from "./service";

export default class Service {
  constructor() {
    this.service = new LanguageService();
  }

  updateLanguageCookie(data) {
    return this.service.changeLanguage(data).catch(error => {
      console.log(error);
      throw error;
    });
  }
}
