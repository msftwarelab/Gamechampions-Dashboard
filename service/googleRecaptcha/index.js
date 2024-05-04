import GoogleRecaptchaMockService from "./service.mock";
import { toRecaptchaVerifyResponse } from "./adapter";

export default class GoogleRecaptcha
{
  constructor({ service } = {}) {
    this.service = service || new GoogleRecaptchaMockService()
  }

  verifyRecaptchaToken(data) {
    return this.service.verifyRecaptchaToken(data).then(response => toRecaptchaVerifyResponse(response));
  }
}