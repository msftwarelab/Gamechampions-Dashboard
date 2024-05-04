import PaginatedApiService from "~service/paginatedApiService";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "../constants";

export default class Service extends PaginatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/players/online`;
  }

  getAll({ data }) {
    return super.get({
      url: `${this.getServiceUrl()}?${PAGE_QUERY_PARAM_NAME}=${
        data.page
      }&${PAGE_SIZE_QUERY_PARAM_NAME}=${data.pageSize}`
    });
  }
  getReferrerId({ data }) {
    let id = data.id;
    if (id) {
      // TODO : uncomment this line when referrerId endpoint is deployed
      // return super.get({
      //   url: `${this.getServiceUrl()}/${id}/referrerId`
      // });
      return Promise.resolve({ referrerId: `generatedhash${id}` });
    }
  }

  sendInvite({ data, id }) {
    return super.post({
      url: `${this.getServiceUrl()}/${id}/referfriend`,
      data
    });
  }
}
