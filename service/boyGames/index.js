import { toBoyGamesArray, toQuickLinksArray } from "./adapter";
import MockService from "./service.mock";

export default class BoyGames {
  constructor({ service } = {}) {
    this.service = service || new MockService();
  }

  getBoyGames(data) {
    return this.service
      .getBoyGames({ selectedLanguage: data.selectedLanguage })
      .then(response => toBoyGamesArray(response));
  }

  getBoyQuickLinks(data) {
    return this.service
      .getBoyQuickLinks({ selectedLanguage: data.selectedLanguage })
      .then(response => toQuickLinksArray(response));
  }

  getDashboardFooter(data) {
    return this.service.getDashboardFooter({
      selectedLanguage: data.selectedLanguage
    });
  }
}
