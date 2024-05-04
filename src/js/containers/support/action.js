import {
  REDUCER_NAME,
  SUPPORT_ERROR,
  SUPPORT_LOADING,
  SET_PAGE
} from "./constants";
import { getPage, renderPage } from "~containers/page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: SUPPORT_LOADING,
  data
});

const isError = data => ({
  type: SUPPORT_ERROR,
  data
});

const setPage = data => ({
  type: SET_PAGE,
  data
});

export const getPageContent = data => dispatch => {
  dispatch(isLoading(true));
  return Api.content
    .getHowToPlay(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setPage(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
    });
};

export const fetchSupport = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getPageContent()(dispatch)
  ]);
