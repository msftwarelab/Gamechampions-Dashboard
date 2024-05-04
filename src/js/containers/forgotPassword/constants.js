import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "forgotPassword";
export const RETURN_URL = "/login";
export const FORM_FIELDS = [
  {
    id: 1,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "email",
      label: "EmailLabel",
      autoComplete: "email",
      material: true,
      className: "single"
    },
    validation: { required: "EmailValidationRequired" }
  }
];
