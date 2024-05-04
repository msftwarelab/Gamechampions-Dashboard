import * as CONSTANTS from "./constants";
import { getRoutes } from "~routes";
import Api from "../../../../service/main";

const loadRoutes = data => {
  return {
    type: CONSTANTS.SET_ROUTES,
    data
  };
};

const setGoMaps = data => {
  return {
    type: CONSTANTS.SET_GO_MAPS,
    data
  };
};

export const fetchRoutes = () => {
  return dispatch => {
    return getRoutes()
      .then(response => {
        dispatch(loadRoutes(response));
        return response;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};

export const getGoMaps = () => {
  return dispatch => {
    return Api.games
      .getGoMaps()
      .then(response => {
        dispatch(setGoMaps(response));
        return response;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
