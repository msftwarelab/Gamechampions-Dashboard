import { getRoutes } from "~routes";
import { matchPath } from "react-router-dom";
import Api from "~service/main";
import { SESSION_NAME } from "~service/constants";
import {
  getLanguageFromUrl,
  getLanguageFromUrlWithDefault
} from "../../../src/js/util/util";

export const authMiddleware = (req, res, next) => {
  const user = req.session[SESSION_NAME] || null;
  const isAuthSet = user && user.token && user.refreshToken;
  const { path } = req;
  if (isAuthSet) {
    if (user.token !== Api.getToken()) {
      Api.setToken(user.token);
    }
    if (user.refreshToken !== Api.getRefreshToken()) {
      Api.setRefreshToken(user.refreshToken);
    }
  } else {
    Api.setToken(null);
    Api.setRefreshToken(null);
  }

  const language = getLanguageFromUrl(path);
  const isAsset =
    path.includes(".jpg") ||
    path.includes(".png") ||
    path.includes(".ico") ||
    path.includes(".svg");
  if (isAsset || !language) {
    return next();
  }
  if (
    isAuthSet &&
    matchPath(path, {
      path: "/" + language + "/login/",
      exact: true
    })
  ) {
    return res.redirect("/" + language + "/arena");
  }

  getRoutes().then(routes => {
    var route = routes.find(item => {
      return matchPath(req.path, {
        path: item.url,
        exact: true
      });
    });

    if (!route) {
      return next();
    }
    const matchedlanguage = getLanguageFromUrlWithDefault(route.url);
    if (route.isPublic || user) {
      if (route.roles) {
        if (route.roles.includes(user.role)) {
          return next();
        } else {
          // if user doesnt have role acces for the route redirect to main page
          return res.redirect("/" + matchedlanguage);
        }
      } else {
        return next();
      }
    }

    if (!user) {
      console.log(
        "redirecting to login, session couldnt be found in auth middleware",
        req.session,
        req.session[SESSION_NAME]
      );
      return res.redirect(`/${matchedlanguage}/login?redirect_url=${path}`);
    }
  });
};
