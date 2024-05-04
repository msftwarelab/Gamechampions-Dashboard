import PaginatedApiService from "../paginatedApiService";
import {
  PAGE_SIZE_QUERY_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME
} from "../constants";
const PAGE_SIZE = 10;

export default class AffiliatesService extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/affiliates`;
  }

  getAll(data) {
    let requestUrl = data
      ? `${this.getServiceUrl()}/?${PAGE_QUERY_PARAM_NAME}=${
          data.page
        }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
      : `${this.getServiceUrl()}/?${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE}`;

    return super.get({
      url: requestUrl
    });
  }

  getById(data) {
    let url = `${this.getServiceUrl()}/${data}`;
    return super.get({
      url
    });
  }

  createAffiliate({ data }) {
    return super.post({
      url: `${super.getServiceUrl()}/affiliateUsers`,
      data
    });
  }

  getUrls(data) {
    const { affiliateId } = data;
    let requestUrl = `${this.getServiceUrl()}/${affiliateId}/links`;

    return super.get({
      url: requestUrl
    });
  }

  createAffiliateUrl({ data }) {
    return super.post({
      url: `${super.getServiceUrl()}/affiliateLinks`,
      data
    });
  }

  getAffiliatePlayers(data) {
    const { affiliateId, medium, dateFrom, dateTo } = data;
    let requestUrl = `${this.getServiceUrl()}/${affiliateId}/allCustomers`;

    data = {};

    data.from = dateFrom
      ?.set?.({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .format("YYYY-MM-DDTHH:mm:ss");

    data.to = dateTo
      ?.set?.({ hour: 23, minute: 59, second: 59, millisecond: 0 })
      .format("YYYY-MM-DDTHH:mm:ss");

    if (medium) {
      data.medium = medium;
    }

    return super.get({
      url: requestUrl,
      data
    });
  }

  loadMedia(data) {
    let url = `${this.getServiceUrl()}/${data}/mediums`;
    return super.get({
      url
    });
  }

  trackAffiliate(data) {
    return super.post({ url: `${this.getServiceUrl()}/trackAffiliate`, data });
  }

  getTotalCommission(data = {}) {
    const { id, medium, dateFrom, dateTo } = data;
    let requestUrl = `${this.getServiceUrl()}/${id}/totalCommission?`;

    if (dateFrom && Object.keys(dateFrom).length > 0) {
      requestUrl =
        requestUrl +
        `&from=${dateFrom
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .format("YYYY-MM-DDTHH:mm:ss")}`;
    }
    if (dateTo && Object.keys(dateTo).length > 0) {
      requestUrl =
        requestUrl +
        `&to=${dateTo
          .set({ hour: 23, minute: 59, second: 59, millisecond: 0 })
          .format("YYYY-MM-DDTHH:mm:ss")}`;
    }
    if (medium) {
      requestUrl = requestUrl + `&medium=${medium}`;
    }

    return super.get({
      url: requestUrl
    });
  }

  blockAffiliate(data) {
    let url = `${this.getServiceUrl()}/${data.id}/block`;
    return super.put({
      url
    });
  }

  blockAffiliateLink(data) {
    let url = `${super.getServiceUrl()}/affiliateLinks/${data}/block`;
    return super.put({
      url
    });
  }

  loadAffiliatePromotions(data) {
    let url = `${this.getServiceUrl()}/${data.affiliateId}/promotions `;
    return super.get({
      url
    });
  }

  deleteAffiliatePromotion(data) {
    let url = `${super.getServiceUrl()}/affiliatePromotionAffiliates/${
      data.promotionId
    }`;
    return super.delete({
      url
    });
  }

  promoteAffiliate(data) {
    return super.post({
      url: `${super.getServiceUrl()}/affiliatePromotionAffiliates`,
      data
    });
  }

  updateAffiliate({ data }) {
    const { id } = data;
    return super.put({
      url: `${this.getServiceUrl()}/${id}`,
      data
    });
  }

  updateAffiliateUrl({ data }) {
    const { id } = data;
    return super.put({
      url: `${super.getServiceUrl()}/affiliateLinks/${id}`,
      data
    });
  }
}
