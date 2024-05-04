import { SESSION_LANGUAGE } from "~service/constants";

const REMEMBER_MAX_AGE = 10 * 365 * 24 * 60 * 60 * 1000;

export const changeLanguageHandler = req => {
  const existingData = req.session[SESSION_LANGUAGE] || {};

  req.session[SESSION_LANGUAGE] = {
    ...existingData,
    ...req.body
  };

  if (req.body.rememberSession) {
    req.session.cookie.maxAge = REMEMBER_MAX_AGE;
  }

  req.session.save();
};
