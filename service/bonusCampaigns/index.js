import {
  toBonusCampaign,
  toBonusCampaignJson,
  ToBonusValue,
  ToBonusValues,
  ToDirectBonusValues,
  ToWelcomeBonusStatus
} from "./adapter";
import MockService from "./service.mock";

export default class bonusCampaigns {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }
  get(data) {
    return this.service.get(data).then(response => toBonusCampaign(response));
  }
  getById(data) {
    return this.service.getById(data).then(response => ToBonusValue(response));
  }

  create(data) {
    return this.service
      .create({ data: toBonusCampaignJson(data) })
      .then(response => ToBonusValue(response));
  }

  delete(data) {
    return this.service.deleteBonus(data);
  }

  update(data) {
    return this.service
      .update({ data: toBonusCampaignJson(data) })
      .then(response => ToBonusValue(response));
  }

  getBonusAvailable() {
    return this.service
      .getBonusAvailable()
      .then(response => ToBonusValues(response));
  }

  getDirectBonusCampaigns() {
    return this.service
      .getDirectBonusCampaigns()
      .then(response => ToDirectBonusValues(response));
  }

  getWelcomeBonus(data) {
    return this.service.getWelcomeBonus(data).then(ToWelcomeBonusStatus);
  }
}
