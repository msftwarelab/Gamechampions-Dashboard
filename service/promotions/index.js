import MockService from "./service.mock";
import { toPromotion, toPromotionJson, toPromotions } from "./adapter";

export default class Promotions {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getAllPrmotions() {
    return this.service.getAll().then(response => toPromotions(response));
  }

  getAll(data) {
    return this.service.getAll(data).then(response => toPromotions(response));
  }

  getPromotionById(data) {
    return this.service
      .getPromotionById(data)
      .then(response => toPromotion(response));
  }
  createPromotion(data) {
    return this.service
      .createPromotion(toPromotionJson(data))
      .then(response => toPromotion(response));
  }

  updatePromotion(data) {
    return this.service
      .updatePromotion(toPromotionJson(data))
      .then(response => toPromotion(response));
  }

  deletePromotion(data) {
    return this.service.deletePromotion(data).then(response => response);
  }
}
