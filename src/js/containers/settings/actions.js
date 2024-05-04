import * as CONSTANTS from "./constants";
import { getPage, renderPage } from "../page/actions";

export const setPushEnabled = data => {
  return {
    type: CONSTANTS.SET_PUSH_ENABLED,
    data
  };
};

export const getSettings = data => dispatch => {
  dispatch(setPushEnabled(false));
  return getPage(data)(dispatch);
};

export const fetchSettings = data => dispatch =>
  renderPage({ reducerName: CONSTANTS.REDUCER_NAME, get: getSettings, data })(
    dispatch
  );
