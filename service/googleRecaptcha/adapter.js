export const toRecaptchaVerifyResponse = (data) => {
  if(data) {
    return {
      success: data.success,
      score: data.score,
      challengeTimestamp: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data["error-codes"]
    }
  }
}