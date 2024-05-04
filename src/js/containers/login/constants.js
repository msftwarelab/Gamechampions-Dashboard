import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import ForgotPassword from "~components/custom/login/forgotPassword";

export const REDUCER_NAME = "login";
export const RETURN_URL = "/";
export const FACEBOOK_RETURN_URL = "/registration";
export const REDIRECT_QUERY_PARAM = "redirect_url";
export const FORM_FIELDS = ({ selectedLanguage }) => [
  {
    id: 1,
    name: "userName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "EmailLabel",
      type: "text",
      autoComplete: "user-name",
      material: true,
      className: "single",
      isAlwaysOpen: true
    },
    validation: { required: "LoginUsernameValidationRequired" }
  },
  {
    id: 2,
    name: "password",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "Password",
      type: "password",
      autoComplete: "password",
      material: true,
      className: "single",
      isAlwaysOpen: true
    },
    validation: {
      required: "PasswordValidationRequired",
      minLength: {
        value: 8,
        message: "PasswordValidationMinLength"
      }
    }
  },
  {
    id: 3,
    name: "rememberMe",
    componentType: FIELD_TYPES.CHECK_BOX,
    fieldProps: {
      label: "LoginRememberMe",
      autoComplete: "remember-me",
      material: true,
      className: "rememberMe"
    }
  },
  {
    id: 4,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: ForgotPassword,
    selectedLanguage,
    className: "forgotPassword"
  }
];
