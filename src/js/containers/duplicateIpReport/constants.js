import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import moment from "moment";

export const REDUCER_NAME = "duplicateIpsPlayer";
export const LOADING = `${REDUCER_NAME}/LOADING`;
export const ERROR = `${REDUCER_NAME}/ERROR`;
export const SET_ERROR = `${REDUCER_NAME}/SET_ERROR`;
export const RESET_ERROR = `${REDUCER_NAME}/RESET_ERROR`;
export const SET_DUPLICATE_IP_PLAYERS = `${REDUCER_NAME}/SET_DUPLICATE_IP_PLAYERS`;
export const SET_DUPLICATE_IP_PLAYERS_DETAIL = `${REDUCER_NAME}/SET_DUPLICATE_IP_PLAYERS_DETAIL`;
export const SET_ADMIN_FILTER_FROM = `${REDUCER_NAME}/SET_ADMIN_FILTER_FROM`;
export const SET_ADMIN_FILTER_TO = `${REDUCER_NAME}/SET_ADMIN_FILTER_TO`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const SET_DETAIL_PAGINATION = `${REDUCER_NAME}/SET_DETAIL_PAGINATION`;
export const PAGE_SIZE_VALUE = 5;
export const RETURN_URL = "/affiliates";
export const DEFAULT_ACTION = "view";
export const CREATE_ACTION = "create";
export const MEDIUM_QUERY_PARAM_NAME = "&IWMedium=";
export const IPADDRESS_QUERY_STRING_PARAM = "ipaddress";
export const FROM_QUERY_STRING_PARAM = "from";
export const TO_QUERY_STRING_PARAM = "to";
export const MINIMUM_LENGTH_TO_SEARCH = 3;
export const DEBOUNCE_TIME = 500;

export const getFilterByDateFormFields = ({
  onRangeChange,
  onSearchChange
}) => [
  {
    id: 1,
    name: "from",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      label: "From",
      type: "text",
      autoComplete: "from",
      material: true,
      onChange: onRangeChange,
      className: "triple"
    },
    validation: {
      watchValidate: watch => ({
        validate: value =>
          moment(value) < moment(watch("to")) ||
          "ConfirmPasswordValidationRequired"
      })
    }
  },
  {
    id: 2,
    name: "to",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      label: "To",
      type: "text",
      autoComplete: "to",
      material: true,
      onChange: onRangeChange,
      className: "triple"
    },
    validation: {
      watchValidate: watch => ({
        validate: value =>
          moment(value) > moment(watch("from")) ||
          "ConfirmPasswordValidationRequired"
      })
    }
  },
  {
    id: 3,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "email",
      label: "EmailLabel",
      autoComplete: "email",
      material: true,
      onChange: onSearchChange,
      className: "triple"
    }
  }
];
