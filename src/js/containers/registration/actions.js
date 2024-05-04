import Api from "../../../../service/main";
import { setAuthentication } from "~containers/app/actions";
import { setProfile } from "~containers/myaccount/actions";
import { transformApiMessages } from "../../util/errorMessages";
import {
  IS_NEW_FACEBOOK_USER,
  REDUCER_NAME,
  SET_FACEBOOK_RESPONSE,
  RESET_FACEBOOK_RESPONSE
} from "./constants";
import { renderPage, getPage } from "../page/actions";

export const setIsNewFacebookUser = data => ({
  type: IS_NEW_FACEBOOK_USER,
  data
});

export const setFacebookResponse = data => ({
  type: SET_FACEBOOK_RESPONSE,
  data
});

export const resetFacebookResponse = data => ({
  type: RESET_FACEBOOK_RESPONSE,
  data
});

export const addUserMail = data => () =>
  Api.mailProvider
    .addUserMail(data)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });

export const createAccount = data => dispatch => {
  return Api.authentication
    .createMyAccount({
      ...data,
      ttl: process.env.API_TOKEN_DURATION
    })
    .then(response => {
      const { authentication, profile } = response;
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
      dispatch(setAuthentication(authentication));
      // store profile in profile reducer
      dispatch(setProfile(profile));

      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const sendTrackAffiliate = data => () => {
  return Api.affiliates.trackAffiliate(data).catch(error => {
    throw error;
  });
};

export const fetchRegistration = ({ pageData }) => dispatch => {
  return Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);
};

const getCustomMessagesShema = () => ({
  400: "GenericRegistrationError"
});

export const getRegistrationApiErrorMessage = apiErrorResponse =>
  transformApiMessages(apiErrorResponse, getCustomMessagesShema());
