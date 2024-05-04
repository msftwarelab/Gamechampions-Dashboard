import AuthenticatedApiService from "../authenticatedApiService";
import { matchPath } from "react-router-dom";
import { enPages } from "./en";
import { esPages } from "./es";
import { frPages } from "./fr";
import { dePages } from "./de";
import { itPages } from "./it";
import { ptPages } from "./pt";
import { nlPages } from "./nl";
import { krPages } from "./kr";
import { jpPages } from "./jp";

export default class Service extends AuthenticatedApiService {
  get({ data }) {
    let pages = enPages;

    if (data) {
      switch (data.language) {
        case "es":
          pages = esPages;
          break;
        case "fr":
          pages = frPages;
          break;
        case "de":
          pages = dePages;
          break;
        case "it":
          pages = itPages;
          break;
        case "pt":
          pages = ptPages;
          break;
        case "nl":
          pages = nlPages;
          break;
        case "jp":
          pages = jpPages;
          break;
        case "kr":
          pages = krPages;
          break;
      }
    }

    let result;

    if (data && data.url) {
      result = pages.find(n => {
        return matchPath(data.url, {
          path: n.url,
          exact: true
        });
      });
    }

    if (!result) {
      const language = data.language ? data.language : "en";
      result = pages.find(n => n.url === `/${language}/page-not-found`);
    }

    return Promise.resolve(result);
  }
}
