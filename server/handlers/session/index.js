import { SESSION_NAME } from "~service/constants";

const REMEMBER_MAX_AGE = 365 * 24 * 60 * 60 * 1000;

export const createSessionHandler = (req, res) => {
  const existingData = req.session[SESSION_NAME] || {};

  req.session[SESSION_NAME] = {
    ...existingData,
    ...req.body.sessionData
  };

  if (req.body.rememberSession) {
    req.session.cookie.maxAge = REMEMBER_MAX_AGE;
  }

  req.session.save(() => {
    return res.status(200);
  });
};

export const deleteSessionHandler = (req, res) => {
  req.session.destroy(function(err) {
    return res.status(200);
  })
};
