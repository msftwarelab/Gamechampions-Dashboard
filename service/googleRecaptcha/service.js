import ApiService from "~service/apiService";

export default class GoogleRecaptchaService extends ApiService
{
  getServiceUrl() {
    return `${super.getServiceUrl()}/recaptcha`;
  }

  verifyRecaptchaToken({ token }) {
    let requestUrl = `${this.getServiceUrl()}?token=${token}`;
    return super.post({ url: requestUrl, data: null })
  }
}