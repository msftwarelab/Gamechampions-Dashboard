import Api from "./main";
import ApiService from "./apiService";
import { getLanguageFromUrlWithDefault } from "../src/js/util/util";

export default class AuthenticatedApiService extends ApiService {
  constructor() {
    super();

    // distinguish between node & browser
    const hasStorage = typeof sessionStorage !== "undefined";
    const language = hasStorage
      ? getLanguageFromUrlWithDefault(window.location.href)
      : "en";

    // interceptor that appends the authorization header
    this.instance.interceptors.request.use(config => {
      config.headers["Authorization"] = `Bearer ${Api.getToken()}`;
      return config;
    });

    // interceptor that will authenticate the user if a 401 is received
    this.instance.interceptors.response.use(undefined, error => {
      if (error.response.status === 401) {
        if (!error.config.__isRetryRequest) {
          if (hasStorage) {
            // add the reponse to sessionStorage
            const refreshToken = Api.getRefreshToken();

            if (refreshToken) {
              return Api.authentication
                .refreshToken({
                  ttl: process.env.API_TOKEN_DURATION,
                  refreshToken: refreshToken
                })
                .then(response => {
                  let config = error.config;
                  config.__isRetryRequest = true;
                  config.headers["Authorization"] = `Bearer ${response.token}`;

                  // sync with node express-session

                  // sync with node express-session
                  const sessionData = {
                    token: response.token,
                    refreshToken: response.refreshToken
                  };

                  Api.session.create({
                    sessionData
                  });

                  // update refresh token in main instance
                  Api.setToken(response.token);
                  Api.setRefreshToken(response.refreshToken);

                  // resubmit the original request
                  return this.instance(config);
                });
            } else {
              // there is no token force user to login
              console.error(
                "Authentication Error: Please refresh to generate a new token."
              );

              // clear out user session in node express-session
              Api.session.delete();

              // clear out session storage
              Api.setToken(null);
              Api.setRefreshToken(null);

              if (
                window.location.href !==
                `${window.location.origin}/${language}/login`
              ) {
                window.location.replace(`/${language}/login`);
              }
            }
          } else {
            console.error(
              "Authentication Error: Server failed to authenticate."
            );
            // clear out user session in node express-session
            Api.session.delete();

            // clear out session storage
            Api.setToken(null);
            Api.setRefreshToken(null);
          }
        } else {
          // we have already tried to re-sent the request but still getting 401
          // clear token and redirect to login

          console.error("Authentication Error: Server failed to authenticate.");
          // clear out user session in node express-session
          Api.session.delete();

          // clear out session storage
          Api.setToken(null);
          Api.setRefreshToken(null);

          if (
            hasStorage &&
            window.location.href !==
              `${window.location.origin}/${language}/login`
          ) {
            window.location.replace(`/${language}/login`);
          }
        }
      }

      return Promise.reject(error);
    });
  }
}
