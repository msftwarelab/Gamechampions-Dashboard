/*
 * Root component for client-side
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import configuration from "~config";

import OfflineManager from "../../util/offlineManager";
import { configureStore } from "../../util/store";
import { selectRoutes } from "../routes/reducer";
import Routes from "../routes/index";
import { TopLevelErrorBoundary } from "../errorBoundary";
import {
  setDeferredPrompt,
  setIsMobile,
  fetchCountries,
  setAuthentication,
  resetAuthentication,
  getBrandConfig,
  setIsIos
} from "./actions";
import Api from "~service/main";
import { createTheme } from "../../theme";
import { fetchLanguages, setLanguage } from "~containers/multiLanguage/actions";
import { getProfile } from "~containers/myaccount/actions";
import { getWalletAmount } from "~containers/wallet/actions";
import { ROLES } from "~service/constants";
import { getGames } from "~containers/games/actions";
import { breakpoints } from "~theme";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    // grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__;

    // make sure service instance also stores token and refresh token
    Api.setToken(preloadedState.app.auth.token);
    Api.setRefreshToken(preloadedState.app.auth.refreshToken);

    // allow the passed state to be garbage-collected
    // delete window.__PRELOADED_STATE__;

    this.store = configureStore(preloadedState);
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const screenSize = parseInt(breakpoints.md.replace("rem", "")) * 16;
    if (window.innerWidth > screenSize) {
      this.store.dispatch(setIsMobile(false));
    } else {
      this.store.dispatch(setIsMobile(true));
    }
  }

  handleIos() {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));

    this.store.dispatch(setIsIos(isIos));
  }

  componentDidMount() {
    // install service worker
    initServiceWorker();
    initOffline();
    initNoJSObserver();

    OneSignal.push(function() {
      OneSignal.on("notificationDisplay", function() {
        OneSignal.setDefaultNotificationUrl(configuration.dashboardUrl);
      });
    });

    const loggedInAccount = this.store
      .getState()
      .get("myAccount")
      .get("profile")
      .toJS();

    // if we have an already logged in user, check notification
    if (loggedInAccount && loggedInAccount.id) {
      OneSignal.push(function() {
        OneSignal.isPushNotificationsEnabled().then(enabled => {
          if (!enabled) {
            OneSignal.push(function() {
              OneSignal.showSlidedownPrompt();
            });

            OneSignal.on("subscriptionChange", function(isSubscribed) {
              if (isSubscribed) {
                OneSignal.push(function() {
                  OneSignal.sendTag("user", "user_" + loggedInAccount.id);
                });
              }
            });
          } else {
            OneSignal.push(function() {
              OneSignal.sendTag("user", "user_" + loggedInAccount.id);
            });
          }
        });
      });
    }

    window.addEventListener("resize", () => this.handleResize());
    window.addEventListener("resize", () => this.handleIos());

    this.handleResize();
    this.handleIos();

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // store the event so it can be triggered later.
      this.store.dispatch(setDeferredPrompt(e));

      return false;
    });
  }

  render() {
    const routes = selectRoutes(this.store.getState());

    return (
      <Provider store={this.store}>
        <div id="app">
          <ThemeProvider theme={createTheme()}>
            <TopLevelErrorBoundary>
              <BrowserRouter>
                <Routes routes={routes} />
              </BrowserRouter>
            </TopLevelErrorBoundary>
          </ThemeProvider>
        </div>
      </Provider>
    );
  }

  static fetchData(store, { authentication, language }) {
    return store.dispatch(dispatch => {
      var promises = [];

      promises.push(getBrandConfig()(dispatch));
      promises.push(fetchLanguages()(dispatch));
      promises.push(store.dispatch(setLanguage(language)));
      promises.push(fetchCountries()(dispatch));

      if (authentication && authentication.token) {
        promises.push(setAuthentication(authentication)(dispatch));
        promises.push(getProfile()(dispatch));
        // promises.push(getGames()(dispatch));
        if (authentication.role == ROLES.PLAYER) {
          promises.push(getWalletAmount()(dispatch));
        }
      } else {
        promises.push(resetAuthentication()(dispatch));
      }

      return Promise.all(promises);
    });
  }
}

const initNoJSObserver = () => {
  let targetNode = document.querySelector("html");

  const config = { attributes: true, childList: false, subtree: false };

  const callback = mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type == "attributes") {
        if (targetNode.classList.contains("no-js")) {
          targetNode.classList.remove("no-js");
        }
      }
    }
  };

  let observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
};

const initServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => console.log("Workbox successfuly registered", reg))
      .catch(reg => console.log("Error whilst registering workbox", reg));

    navigator.serviceWorker
      .register("/OneSignalSDKWorker.js")
      .then(reg => {
        console.log("Successfully registered service worker", reg);
      })
      .catch(err => {
        console.warn("Error whilst registering service worker", err);
      });
  }
};

const initOffline = () => {
  window.addEventListener(
    "online",
    () => {
      OfflineManager.setOffline(false);
    },
    false
  );

  window.addEventListener(
    "offline",
    () => {
      OfflineManager.setOffline(true);
    },
    false
  );

  if (!navigator.onLine) {
    OfflineManager.setOffline(true);
  }
};
