import * as CONSTANTS from "./constants";
import { isLoading, isError, setMeta, setTitle, setUrl } from "../app/actions";
import Api from "../../../../service/main";

const loadNamedPage = (data, reducerName) => ({
  type: `${CONSTANTS.SET_PAGE}/${reducerName}`,
  data
});

export const getPage = data => () => Api.pages.get(data);

export const renderPage = ({ reducerName, get, data }) => dispatch => {
  dispatch(isLoading(true));
  dispatch(isError(false));

  return get(data)(dispatch)
    .then(response => {
      dispatch(loadNamedPage(response, reducerName));
      dispatch(setMeta(response.meta));
      dispatch(setTitle(response.title));
      dispatch(setUrl(response.url));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const fetchPage = (data, reducerName) => dispatch =>
  renderPage({
    reducerName: reducerName || CONSTANTS.REDUCER_NAME,
    get: getPage,
    data
  })(dispatch);
