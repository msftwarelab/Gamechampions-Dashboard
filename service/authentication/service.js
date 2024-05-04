import ApiService from "../apiService";

export default class AuthenticationService extends ApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/Authentication`;
  }

  authenticate({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/Authenticate`,
      data
    });
  }

  facebookAuthenticate({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/Authenticate`,
      data
    });
  }

  refreshToken({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/RefreshToken`,
      data
    });
  }

  resetPassword(data) {
    return super.get({
      url: `${this.getServiceUrl()}/ResetPassword/${data.email}`,
      data
    });
  }

  getFromHash(hash) {
    if (hash) {
      const url = `${this.getServiceUrl()}/GetUserFromHash/${hash}`;
      return super.get({ url });
    }
  }

  changePassword({ data }) {
    const url = `${this.getServiceUrl()}/UpdatePassword`;
    return this.post({ url, data });
  }
  createMyAccount({ data }) {
    const url = `${super.getServiceUrl()}/players`;
    return this.post({ url, data });
  }
}
