import { SET_SUCCESS, RESET_ERROR } from "./constants";
import Api from "../../../../service/main";
import { transformApiMessages } from "../../util/errorMessages";

const setSuccess = () => ({
  type: SET_SUCCESS
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const submitContact = data => dispatch =>
  Api.contact
    .submit(data)
    .then(response => {
      dispatch(setSuccess());
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });

export const getContactApiErrorMessage = apiErrorResponse =>
  transformApiMessages(apiErrorResponse, () => ({}));
