import axios from "axios";

import { API_URL, HUBS_API_URL, UMBRACO_API_URL } from "./constants";

export default class ApiService {
  constructor() {
    this.instance = axios.create();
  }

  get({ id = "", url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "get",
      url: serviceUrl,
      params: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  post({ id = "", url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "post",
      url: serviceUrl,
      data: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  put({ id = "", url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "put",
      url: serviceUrl,
      data: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  patch({ id = "", url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "patch",
      url: serviceUrl,
      data: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  delete({ id = "", url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "delete",
      url: serviceUrl,
      data: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  getServiceUrl() {
    return API_URL;
  }

  getUmbracoServiceUrl() {
    return UMBRACO_API_URL;
  }

  getHubServiceUrl() {
    return HUBS_API_URL;
  }

  getEndpointUrl({ id = "", url = "" }) {
    let serviceUrl = url || this.getServiceUrl();

    if (id) {
      serviceUrl = `${serviceUrl}/${id}`;
    }

    return serviceUrl;
  }
}
