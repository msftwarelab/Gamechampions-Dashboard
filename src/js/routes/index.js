import Api from "~service/main";
import getRouteList from "./route-list";

export const getRoutes = () => {
  // retrieve the navigation from the shared Umbraco SDK
  return Api.router.getRoutingTable().then(response => {
    // iterate route data to create Route components
    let newRoutes = [];
    response.urlsAndDocTypes.forEach(item => {
      let route = getRouteList().find(
        routeItem => routeItem.name.toLowerCase() === item.value.toLowerCase()
      );

      if (route) {
        route.url = item.key;
        newRoutes.push(route);
      }
    });
    return newRoutes;
  });
};

/**
 * Util function to return Container based on route name
 */
export const getRouteComponent = routeName => {
  return getRouteList().find(item => item.name === routeName);
};
