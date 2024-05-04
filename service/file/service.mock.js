import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
  }

  post() {
    return Promise.resolve({
      fileUrl: "/files/adqwdqwd1314124124.txt",
      fileName: "test1.txt"
    });
  }
}
