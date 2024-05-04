import AuthenticatedApiService from "../authenticatedApiService";
import { enRoutes } from "./en";
import { esRoutes } from "./es";
import { frRoutes } from "./fr";
import { deRoutes } from "./de";
import { itRoutes } from "./it";
import { ptRoutes } from "./pt";
import { nlRoutes } from "./nl";
import { krRoutes } from "./kr";
import { jpRoutes } from "./jp";

export default class RouterMockService extends AuthenticatedApiService {
  get() {
    let routes = [
      enRoutes,
      esRoutes,
      frRoutes,
      deRoutes,
      itRoutes,
      ptRoutes,
      jpRoutes,
      nlRoutes,
      krRoutes
    ];

    return Promise.resolve(routes);
  }
}
