import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "resetPassword";
export const SET_PERSON = `${REDUCER_NAME}/SET_PERSON`;
export const HASH_QUERY_STRING_PARAM = "hash";
export const RETURN_URL = "/login";
export const FORM_FIELDS = [
  {
    id: 1,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "EmailLabel",
      type: "email",
      autoComplete: "email",
      material: true,
      className: "single",
      isAlwaysOpen: true
    },
    validation: { required: "Email is required" }
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
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  },
  {
    id: 3,
    name: "confirmPassword",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ConfirmPasswordLabel",
      type: "password",
      autoComplete: "confirm-password",
      material: true,
      className: "single",
      isAlwaysOpen: true
    },
    validation: {
      watchValidate: watch => ({
        validate: value =>
          value === watch("password") || "Passwords don't match."
      })
    }
  }
];
