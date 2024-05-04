export default class GoogleRecaptchaMockService
{
  constructor() {
    this.verifyResult = {
      success: true,
      score: 1.0,
      challengeTimestamp: new Date(),
      hostname: "localhost",
      errorCodes: []
    }
  }

  verifyRecaptchaToken() {
    return Promise.resolve(this.verifyResult)
  }
}