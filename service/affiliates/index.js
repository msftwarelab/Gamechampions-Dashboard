import MockService from "./service.mock";
import {
  toAffiliate,
  toAffiliates,
  toCreateAffiliate,
  toUrlsArray,
  toCreateAffiliateUrl,
  toTrackAffiliateJson,
  toUrl,
  toAffiliatePlayersArray,
  toAffiliateCommission,
  toUpdateAffiliate,
  toUpdateAffiliateUrl,
  toLink,
  toMediaArray,
  toAffiliatePromotionsArray,
  toPromoteAffiliateJson
} from "./adapter";

export default class Affiliates {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  getAll(data) {
    return this.service.getAll(data).then(response => toAffiliates(response));
  }

  createAffiliate(data) {
    return this.service
      .createAffiliate({ data: toCreateAffiliate(data) })
      .then(response => toAffiliate(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getUrls(data) {
    return this.service.getUrls(data).then(response => toUrlsArray(response));
  }

  getById(data) {
    return this.service.getById(data).then(response => toAffiliate(response));
  }

  createAffiliateUrl(data) {
    return this.service
      .createAffiliateUrl({ data: toCreateAffiliateUrl(data) })
      .then(response => toUrl(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getAffiliatePlayers(data) {
    return this.service
      .getAffiliatePlayers(data)
      .then(response => toAffiliatePlayersArray(response));
  }

  loadMedia(data) {
    return this.service
      .loadMedia(data)
      .then(response => toMediaArray(response));
  }

  trackAffiliate(data) {
    return this.service
      .trackAffiliate(toTrackAffiliateJson(data))
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getTotalCommission(data) {
    return this.service
      .getTotalCommission(data)
      .then(response => toAffiliateCommission(response));
  }

  updateAffiliate(data) {
    return this.service
      .updateAffiliate({ data: toUpdateAffiliate(data) })
      .then(response => toAffiliate(response));
  }

  updateAffiliateUrl(data) {
    return this.service
      .updateAffiliateUrl({ data: toUpdateAffiliateUrl(data) })
      .then(response => toUrl(response));
  }

  blockAffiliate(data) {
    return this.service
      .blockAffiliate(data)
      .then(response => toAffiliate(response));
  }

  blockAffiliateLink(data) {
    return this.service
      .blockAffiliateLink(data)
      .then(response => toLink(response));
  }

  loadAffiliatePromotions(data) {
    return this.service
      .loadAffiliatePromotions(data)
      .then(response => toAffiliatePromotionsArray(response));
  }

  deleteAffiliatePromotion(data) {
    return this.service
      .deleteAffiliatePromotion(data)
      .then(response => response);
  }

  promoteAffiliate(data) {
    return this.service
      .promoteAffiliate(toPromoteAffiliateJson(data))
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
