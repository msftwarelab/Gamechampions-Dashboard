import { SET_NAV_ITEM_ACTIVE, SET_NAVIGATION } from "./constants";
import Api from "../../../../service/main";

export const setNavItemActive = data => {
  return {
    type: SET_NAV_ITEM_ACTIVE,
    data
  };
};

const loadNavigation = data => {
  return {
    type: SET_NAVIGATION,
    data
  };
};

export const fetchNavigation = data => dispatch =>
  Api.navigation
    .get(data)
    .then(response => {
      dispatch(loadNavigation(response));
      return response;
    })
    .catch(error => {
      throw error;
    });
