import ApiService from "~service/apiService";

export default class bonusCampaignsMockService extends ApiService {
  getBonusAvailable() {
    return Promise.resolve();
  }
}
