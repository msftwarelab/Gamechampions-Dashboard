import { PAGE_SIZE_VALUE } from "~containers/bonusCampaigns/constants";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME
} from "~service/constants";
import PaginatedApiService from "~service/paginatedApiService";

export default class Service extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/bonusCampaigns`;
  }

  get(data = {}) {
    let { searchTerm, page, pageSize = PAGE_SIZE_VALUE } = data;

    let requestUrl = `${this.getServiceUrl()}?${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`;

    page && (requestUrl += `&${PAGE_QUERY_PARAM_NAME}=${page}`);

    searchTerm && (requestUrl += `&${SEARCH_TERM_PARAM_NAME}=${searchTerm}`);

    return super.get({
      url: requestUrl
    });
  }

  getById(data) {
    return super.get({
      url: `${this.getServiceUrl()}/${data.id}`
    });
  }

  create({ data }) {
    return this.post({ data, url: `${this.getServiceUrl()}` });
  }

  update({ data = {} }) {
    const { id } = data;
    return this.put({ data, url: `${this.getServiceUrl()}/${id}` });
  }

  deleteBonus({ id }) {
    return this.delete({ url: `${this.getServiceUrl()}/${id}` });
  }

  getBonusAvailable() {
    return super.get({
      url: `${this.getServiceUrl()}/Available`
    });
  }

  getDirectBonusCampaigns() {
    return super.get({
      url: `${this.getServiceUrl()}/Direct`
    });
  }

  getWelcomeBonus(data) {
    return super.get({
      url: `${this.getServiceUrl()}/welcomeBonus/${data.id}`
    });
  }
}
