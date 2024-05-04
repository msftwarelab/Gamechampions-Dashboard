import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { connect } from "react-redux";
import { compose } from "redux";
import { pathToRegexp } from "path-to-regexp";

import { getPageState, createReducer } from "~containers/page/reducer";
import { renderPage } from "~containers/page/actions";
import * as CONSTANTS from "~containers/page/constants";
import { setTitle, setMeta, setUrl } from "~containers/app/actions";
import { selectUrl } from "~containers/app/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

const withPage = (WrappedComponent, getData, reducerName) => {
  createReducer(reducerName);

  class Page extends React.PureComponent {
    componentDidMount() {
      const {
        url,
        onLoadPage,
        match,
        onSetTitle,
        onSetMeta,
        onSetUrl,
        selectedLanguage
      } = this.props;

      // test if url changed since the last call of onLoadPage
      const pageData = this.props[CONSTANTS.REDUCER_NAME].get(reducerName);
      const previousUrl = pageData ? pageData.get("url") : undefined;

      if (!pathToRegexp(match.path).test(previousUrl)) {
        // content doesn't exist in store
        onLoadPage(reducerName, getData, {
          url: match.url,
          language: selectedLanguage
        });
      } else if (!pathToRegexp(match.path).test(url)) {
        // content exists in store and user has navigated to a new URL
        onSetTitle(pageData.get("title"));
        onSetMeta(pageData.get("meta"));
        onSetUrl(pageData.get("url"));
      }
    }

    render() {
      const { page, ...rest } = this.props;

      return <WrappedComponent page={page.get(reducerName)} {...rest} />;
    }
  }
  hoistNonReactStatic(Page, WrappedComponent);
  return Page;
};

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => ({
  page: getPageState(state),
  url: selectUrl(state),
  selectedLanguage: selectSelectedLanguage(state)
});

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => ({
  onLoadPage: (reducerName, get, data) =>
    dispatch(renderPage({ reducerName, get, data })),
  onSetTitle: data => dispatch(setTitle(data)),
  onSetMeta: data => dispatch(setMeta(data)),
  onSetUrl: data => dispatch(setUrl(data))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withPage);
