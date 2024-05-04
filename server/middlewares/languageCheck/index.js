import { SESSION_LANGUAGE } from "~service/constants";
import {
  languages,
  getLanguageFromUrlWithDefault
} from "../../../src/js/util/util";

export const languageCheckMiddleware = (req, res, next) => {
  let url = req.url;
  let language = getLanguageFromUrlWithDefault(url);
  let languageSession = req.session[SESSION_LANGUAGE] || null;

  if (!languageSession) {
    req.session[SESSION_LANGUAGE] = {
      code: req.acceptsLanguages(languages) || language
    };

    req.session.save(() => {
      next();
    });
  } else {
    if (language != languageSession.code) {
      const newUrl = url.replace(`/${language}`, `/${languageSession.code}`);
      return res.redirect(301, newUrl);
    } else {
      next();
    }
  }
};
