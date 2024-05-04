import AuthenticatedApiService from "../authenticatedApiService";
import { matchPath } from "react-router-dom";
import { getRoutes } from "~routes";
import { ROLES } from "~service/constants";

import { enNav } from "./en";
import { esNav } from "./es";
import { frNav } from "./fr";
import { deNav } from "./de";
import { itNav } from "./it";
import { ptNav } from "./pt";
import { nlNav } from "./nl";
import { krNav } from "./kr";
import { jpNav } from "./jp";

export default class NavigationMockService extends AuthenticatedApiService {
  get({ data = {} }) {
    let nav = enNav();

    if (data) {
      switch (data.language) {
        case "es":
          nav = esNav();
          break;
        case "fr":
          nav = frNav();
          break;
        case "de":
          nav = deNav();
          break;
        case "it":
          nav = itNav();
          break;
        case "pt":
          nav = ptNav();
          break;
        case "nl":
          nav = nlNav();
          break;
        case "kr":
          nav = krNav();
          break;
        case "jp":
          nav = jpNav();
          break;
      }
    }

    if (data.role && data.role === ROLES.ADMIN) {
      nav.icon = {
        title: "home",
        imageUrl: "home",
        alternateText: "home",
        width: "",
        height: ""
      };
    }
    // remove all nav item where the user no access at all
    return getRoutes().then(routes => {
      const { role } = data;
      nav.children = nav.children.filter(navItem => {
        let route = routes.find(item => {
          return matchPath(navItem.url, {
            path: item.url,
            exact: true
          });
        });

        if (!route || !route.roles) {
          return navItem;
        } else {
          return route.roles.includes(role);
        }
      });

      return Promise.resolve(nav);
    });
  }
}
