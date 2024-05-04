/*
 * Root component on the server-side
 */
import React from "react";
import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { fromJS } from "immutable";

import Routes from "~containers/routes";
import { getRouteComponent } from "~routes";
import { configureStore } from "../../../src/js/util/store";
import { defaultPathConfig } from "../../config";
import Navigation from "~containers/navigation/index";
import App from "~containers/app/index";
import PageNotFound from "~containers/pageNotFound/index";
import { SESSION_NAME } from "~service/constants";
import { ServerStyleSheet, ThemeProvider } from "styled-components";
import { createTheme } from "../../../src/js/theme";
import { getLanguageFromUrlWithDefault } from "../../../src/js/util/util";
import initLang from "../../../src/js/i18n";
import { I18nextProvider } from "react-i18next";

export const ssrMiddleware = (req, res) => {
  const { path, url, query } = req;
  const authentication = req.session[SESSION_NAME]
    ? Object.assign({}, req.session[SESSION_NAME])
    : null;
  const language = getLanguageFromUrlWithDefault(url);
  const featchDataParams = { path, url, query, authentication, language };
  // Create a new Redux store instance
  const store = configureStore();
  let appRoutes = null;
  // Fetch Routes, Navigation and App Data
  const fetchRoutes = Routes.fetchData(store);
  const featchNavigation = Navigation.fetchData(store, featchDataParams);
  const feathApp = App.fetchData(store, featchDataParams);

  Promise.all([fetchRoutes, featchNavigation, feathApp])
    // Fetch Routes Data
    .then(([routes]) => {
      const routePromises = [];
      let show404 = true;
      routes.forEach(route => {
        const match = matchPath(path, {
          path: route.url,
          exact: route.exact
        });
        if (!match) return;
        show404 = !!route.isMaster;
        const routeComponent = getRouteComponent(route.name);
        const matchedUrl = url && match.url;
        routeComponent.fetchData.forEach(fn => {
          routePromises.push(
            fn(store, {
              ...featchDataParams,
              path: match.path,
              url: matchedUrl,
              exact: match.exact,
              params: match.params,
              route
            })
          );
        });
      });
      appRoutes = fromJS(routes);

      // Page not found Handler
      if (show404) {
        res.status(404);
        if (PageNotFound) {
          return PageNotFound.fetchData(store);
        }
      }
      return Promise.all(routePromises);
    })
    // Init Language
    .then(() => initLang(language))
    // Render App
    .then(i18n => {
      const staticContext = {};
      const sheet = new ServerStyleSheet();
      const html = renderToString(
        sheet.collectStyles(
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <div id="app">
                <ThemeProvider theme={createTheme()}>
                  <StaticRouter context={staticContext} location={url}>
                    <Routes routes={appRoutes} />
                  </StaticRouter>
                </ThemeProvider>
              </div>
            </Provider>
          </I18nextProvider>
        )
      );
      const styles = sheet.getStyleTags();

      // Grab the initial state from our Redux store
      const preloadedState = store.getState();

      const _preloadedState = JSON.parse(
        JSON.stringify(preloadedState.toJS()).replace(/</g, "\\u003c")
      );
      const data = {
        ...defaultPathConfig,
        html: html,
        preloadedState: JSON.stringify(_preloadedState)
      };
      const helmet = Helmet.renderStatic();

      res.render("index", {
        styles,
        htmlAttributes: helmet.htmlAttributes,
        bodyAttributes: helmet.bodyAttributes,
        head: `${helmet.title} ${helmet.meta} ${helmet.link}`,
        data,
        cache: false
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500);
      res.render("500", { layout: false });
    });
};
