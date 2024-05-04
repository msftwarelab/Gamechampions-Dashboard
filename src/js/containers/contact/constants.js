import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "contact";
export const SET_ERROR = `${REDUCER_NAME}/ERROR`;
export const RESET_ERROR = `${REDUCER_NAME}/RESET_ERROR`;
export const SET_SUCCESS = `${REDUCER_NAME}/SET_SUCCESS`;

export const FORM_FIELDS_CONTACT = [
  {
    id: 11,
    name: "name",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "NameLabel",
      type: "text",
      autoComplete: "name",
      material: true,
      className: "single"
    },
    validation: {
      required: "NameValidationRequired",
      minLength: {
        value: 2,
        message: "NameValidationMinLength"
      }
    }
  },
  {
    id: 12,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "EmailLabel",
      type: "email",
      autoComplete: "email",
      material: true,
      className: "single"
    },
    validation: {
      required: "EmailValidationRequired"
    }
  },
  {
    id: 13,
    name: "message",
    componentType: FIELD_TYPES.TEXT_AREA,
    fieldProps: {
      label: "MessageLabel",
      type: "text",
      autoComplete: "message",
      material: true,
      className: "single"
    },
    validation: {
      required: "MessageValidationRequired"
    }
  }
];
