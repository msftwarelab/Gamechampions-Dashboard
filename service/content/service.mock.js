import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
  }

  getHowToPlay() {
    return Promise.resolve({ html: "" });
  }
}
