import configuration from "~config";
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "addFriend";
export const SET_REFERRER_ID = `${REDUCER_NAME}/SET_REFERRER_ID`;

export const RETURN_URL = "/";
export const WEBSITE_URL = `${configuration.websiteUrl}`;
export const DASHBOARD_URL = `${configuration.dashboardUrl}`;
export const STORAGE_URL = `${configuration.storageUrl}`;
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
      className: "single"
    },
    validation: { required: "Email is required" }
  }
];
