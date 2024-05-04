import MockAuthenticationService from "./service.mock";
import {
  toAuthenticateJson,
  toAuthenticate,
  toRefreshTokenJson,
  toRefreshToken,
  toForgotPasswordJson,
  toResetPassword,
  toResetPasswordJson,
  toChangePasswordJson,
  toFacebookAuthenticateJson,
  toCreateMyAccountJson
} from "./adapter";

export default class Authentication {
  constructor({ service } = {}) {
    this.service = service || new MockAuthenticationService();
    this.token = null;
    this.refresh = null;
  }

  authenticate(data) {
    return this.service
      .authenticate({ data: toAuthenticateJson(data) })
      .then(response => toAuthenticate(response));
  }

  facebookAuthenticate(data) {
    return this.service
      .facebookAuthenticate({ data: toFacebookAuthenticateJson(data) })
      .then(response => toAuthenticate(response));
  }

  refreshToken(data) {
    return this.service
      .refreshToken({ data: toRefreshTokenJson(data) })
      .then(response => toRefreshToken(response));
  }

  resetPassword(data) {
    return this.service
      .resetPassword(toForgotPasswordJson(data))
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getFromHash(data) {
    return this.service
      .getFromHash(data)
      .then(response => toResetPassword(response));
  }

  updatePassword(data) {
    return this.service
      .changePassword({ data: toResetPasswordJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  createMyAccount(data) {
    return this.service
      .createMyAccount({ data: toCreateMyAccountJson(data) })
      .then(response => toAuthenticate(response))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  changePassword(data) {
    return this.service
      .changePassword({ data: toChangePasswordJson(data) })
      .then(response => response)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  setToken(value) {
    this.token = value;
  }

  getToken() {
    return this.token;
  }

  setRefreshToken(value) {
    this.refresh = value;
  }

  getRefreshToken() {
    return this.refresh;
  }
}
