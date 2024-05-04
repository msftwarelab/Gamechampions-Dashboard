import Api from "../../../../service/main";
import { transformApiMessages } from "../../util/errorMessages";

export const submitForgotPassword = data =>
  Api.authentication
    .resetPassword(data)
    .then(response => response)
    .catch(error => {
      console.error(error);
      throw error;
    });

export const getForgoPasswordApiErrorMessage = apiErrorResponse =>
  transformApiMessages(apiErrorResponse, () => ({}));
