import PaginatedApiService from "../paginatedApiService";
import {
  PAGE_SIZE_QUERY_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME
} from "../constants";
const PAGE_SIZE = 10;

export default class AffiliatesService extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/affiliatePromotions`;
  }

  getAllPrmotions() {
    return `${this.getServiceUrl()}/affiliatePromotions`;
  }

  getAll(data = {}) {
    const { page = 1, pageSize = PAGE_SIZE, searchTerm } = data;

    let requestUrl = `${this.getServiceUrl()}/Search?${PAGE_QUERY_PARAM_NAME}=${page}&${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`;

    if (searchTerm) {
      requestUrl = requestUrl + `&${SEARCH_TERM_PARAM_NAME}=${searchTerm}`;
    }

    return super.get({
      url: requestUrl
    });
  }

  getPromotionById(data) {
    return super.get({
      url: `${this.getServiceUrl()}/${data}`,
      data
    });
  }

  createPromotion(data) {
    return super.post({
      url: `${this.getServiceUrl()}`,
      data
    });
  }

  updatePromotion(data) {
    return super.put({
      url: `${this.getServiceUrl()}/${data.id}`,
      data
    });
  }

  deletePromotion(data) {
    return super.delete({
      url: `${this.getServiceUrl()}/${data.id}`
    });
  }
}
