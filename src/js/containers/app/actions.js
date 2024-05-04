import { setProfile } from "../myaccount/actions";
import Api from "~service/main";
import * as CONSTANTS from "./constants";
import { transformApiMessages } from "../../util/errorMessages";

export const isLoading = data => ({
  type: CONSTANTS.APP_LOADING,
  data
});

export const isError = () => ({
  type: CONSTANTS.APP_ERROR
});

export const setBoundaryError = data => ({
  type: CONSTANTS.SET_BOUNDARY_ERROR,
  data
});
export const setIsMobile = data => ({
  type: CONSTANTS.SET_IS_MOBILE,
  data
});
export const setIsIos = data => ({
  type: CONSTANTS.SET_IS_IOS,
  data
});

export const setDeferredPrompt = data => ({
  type: CONSTANTS.SET_DEFERRED_PROMPT,
  data
});

export const setTitle = data => ({
  type: CONSTANTS.SET_TITLE,
  data
});

export const setUrl = data => ({
  type: CONSTANTS.SET_URL,
  data
});

export const setMeta = data => ({
  type: CONSTANTS.SET_META,
  data
});

export const setAuthentication = data => dispatch =>
  dispatch({
    type: CONSTANTS.SET_AUTHENTICATION,
    data
  });

export const resetAuthentication = () => dispatch =>
  dispatch({
    type: CONSTANTS.RESET_AUTHENTICATION
  });

export const setCountries = data => ({
  type: CONSTANTS.SET_COUNTRIES,
  data
});

export const setBrandConfig = data => ({
  type: CONSTANTS.SET_BRAND_CONFIG,
  data
});

export const setRecaptchaResult = data => dispatch =>
  dispatch({
    type: CONSTANTS.SET_RECAPTCHA_RESULT,
    data
  });

export const login = data => dispatch =>
  Api.authentication
    .authenticate({
      ...data,
      ttl: process.env.API_TOKEN_DURATION
    })
    .then(response => {
      const { authentication } = response;
      const { token, refreshToken } = authentication;

      // let nodejs app know that we are logging in with a user
      Api.session.create({
        sessionData: authentication,
        rememberSession: data.rememberMe
      });

      // store token and refresh token for authenticatedApiService
      Api.setToken(token);
      Api.setRefreshToken(refreshToken);
      // store authentication in app reducer
      dispatch(setAuthentication(response.authentication));
      // store profile in profile reducer
      dispatch(setProfile(response.profile));

      return response;
    })
    .catch(error => {
      throw error;
    });

export const facebookLogin = data => dispatch =>
  Api.authentication
    .facebookAuthenticate({
      ...data,
      ttl: process.env.API_TOKEN_DURATION
    })
    .then(response => {
      const { authentication } = response;
      if (authentication.token != undefined) {
        const { token, refreshToken } = authentication;
        // let nodejs app know that we are logging in with a user
        Api.session.create({
          sessionData: authentication,
          rememberSession: data.rememberMe
        });

        // store token and refresh token for authenticatedApiService
        Api.setToken(token);
        Api.setRefreshToken(refreshToken);
        // store authentication in app reducer
        dispatch(setAuthentication(response.authentication));
      }
      // store profile in profile reducer
      dispatch(setProfile(response.profile));

      return response;
    })
    .catch(error => {
      throw error;
    });

export const fetchCountries = () => dispatch => {
  dispatch(isLoading(true));
  return Api.countries
    .get()
    .then(response => {
      dispatch(setCountries(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError());
      console.error(error);
    });
};

export const getRegistrationApiErrorMessage = apiErrorResponse =>
  transformApiMessages(apiErrorResponse, () => ({}));

export const getBrandConfig = () => dispatch => {
  dispatch(isLoading(true));
  return Api.configService
    .getBrandConfig()
    .then(response => {
      dispatch(setBrandConfig(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError());
      console.error(error);
    });
};

export const verifyRecaptchaToken = data => dispatch => {
  dispatch(isLoading(true));
  return Api.googleRecaptcha
    .verifyRecaptchaToken(data)
    .then(response => {
      dispatch(setRecaptchaResult(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError());
      console.error(error);
    });
};
