import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import UrlDiv from "~components/molecules/urlDiv";
import { validURL } from "../../util/util";

export const REDUCER_NAME = "affiliatesAdmin";
export const AFFILATES_LOADING = `${REDUCER_NAME}/AFFILATES_LOADING`;
export const AFFILATES_ERROR = `${REDUCER_NAME}/AFFILATES_ERROR`;
export const SET_ERROR = `${REDUCER_NAME}/SET_ERROR`;
export const RESET_ERROR = `${REDUCER_NAME}/RESET_ERROR`;
export const SET_AFFILATES = `${REDUCER_NAME}/SET_AFFILATES`;
export const REMOVE_AFFILATE = `${REDUCER_NAME}/REMOVE_AFFILATE`;
export const ADD_AFFILATE = `${REDUCER_NAME}/ADD_AFFILATE`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const SET_URLS = `${REDUCER_NAME}/SET_URLS`;
export const SET_SELECTED_AFFILIATE_URL = `${REDUCER_NAME}/SET_SELECTED_AFFILIATE_URL`;
export const RESET_SELECTED_AFFILIATE_URL = `${REDUCER_NAME}/RESET_SELECTED_AFFILIATE_URL`;
export const UPDATE_URLS = `${REDUCER_NAME}/UPDATE_URLS`;
export const SET_SELECTED_URL = `${REDUCER_NAME}/SET_SELECTED_URL`;
export const SET_SELECTED_AFFILATE = `${REDUCER_NAME}/SET_SELECTED_AFFILATE`;
export const RESET_SELECTED_AFFILIATE = `${REDUCER_NAME}/RESET_SELECTED_AFFILIATE`;
export const SET_SELECTED_AFFILATE_PLAYERS = `${REDUCER_NAME}/SET_SELECTED_AFFILATE_PLAYERS`;
export const SET_COMMISSION = `${REDUCER_NAME}/SET_COMMISSION`;
export const RESET_COMMISSION = `${REDUCER_NAME}/RESET_COMMISSION`;
export const RESET_AFFILIATE_PLAYERS = `${REDUCER_NAME}/RESET_AFFILIATE_PLAYERS`;
export const SET_MEDIA = `${REDUCER_NAME}/SET_MEDIA`;
export const SET_AFFILIATE_PROMOTIONS = `${REDUCER_NAME}/SET_AFFILIATE_PROMOTIONS`;
export const SET_SELECTED_PROMOTION = `${REDUCER_NAME}/SET_SELECTED_PROMOTION`;
export const RESET_SELECTED_PROMOTION = `${REDUCER_NAME}/RESET_SELECTED_PROMOTION`;
export const UPDATE_AFFILATE = `${REDUCER_NAME}/UPDATE_AFFILATE`;
export const PAGE_SIZE_VALUE = 10;
export const RETURN_URL = "/affiliates";
export const DEFAULT_ACTION = "view";
export const CREATE_ACTION = "create";
export const BASE_DESTINATION = "https://www.gamechampions.com/en";
export const MEDIUM_QUERY_PARAM_NAME = "&IWMedium=";

export const AFFILIATE_FORM_FIELDS = [
  {
    id: 1,
    name: "fullName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "FullNameLabel",
      type: "text",
      autoComplete: "full-name",
      material: true,
      readOnly: false
    },
    validation: { required: "FullNameValidationRequired" }
  },
  {
    id: 2,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "EmailLabel",
      type: "email",
      autoComplete: "email",
      material: true,
      readOnly: false
    },
    validation: { required: "EmailValidationRequired" }
  },
  {
    id: 8,
    name: "password",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "Password",
      type: "password",
      autoComplete: "password",
      material: true
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
    id: 9,
    name: "confirmPassword",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ConfirmPasswordLabel",
      type: "password",
      autoComplete: "confirm-password",
      material: true
    },
    validation: {
      watchValidate: watch => ({
        validate: value =>
          value === watch("password") || "ConfirmPasswordValidationRequired"
      })
    }
  },
  {
    id: 4,
    name: "lifetimeValue",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "LifetimeValueLabel",
      type: "number",
      material: true,
      readOnly: false
    }
  }
];

export const CREATE_AFFILIATE_URLS_FORM_FIELDS = [
  {
    id: 1,
    name: "destinationUrl",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "DestinationUrlLabel",
      type: "text",
      autoComplete: "destinationUrl",
      material: true,
      readOnly: false
    },
    validation: {
      watchValidate: () => ({
        validate: value =>
          validURL(value) || "AffiliateDestionationUrlValidationMessage"
      })
    }
  },
  {
    id: 2,
    name: "medium",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "MediumLabel",
      type: "text",
      material: true,
      readOnly: false
    }
  },
  {
    id: 3,
    name: "source",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "SourceLabel",
      type: "text",
      material: true,
      readOnly: true
    }
  },
  {
    id: 4,
    name: "shortenedUrl",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ShortenedUrlLabel",
      type: "text",
      material: true,
      readOnly: true
    }
  },
  {
    id: 5,
    name: "longlUrl",
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    className: "single",
    child: UrlDiv,
    mediumQueryParamName: MEDIUM_QUERY_PARAM_NAME
  }
];

export const AFFILIATE_REPORTING_TABLE_FIELDS = ({
  onMediumChange,
  onDateToChange,
  onDateFromChange,
  mediumsList
}) => [
  {
    id: 5,
    name: "type",
    options: mediumsList,
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      onChange: onMediumChange,
      className: "affiliate__reporting-type"
    }
  },
  {
    id: 6,
    name: "dateFrom",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      label: "DateFrom",
      type: "text",
      material: true,
      onChange: onDateFromChange,
      className: "affiliate__reporting-date"
    }
  },
  {
    id: 7,
    name: "dateTo",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      label: "DateTo",
      type: "text",
      material: true,
      onChange: onDateToChange,
      className: "affiliate__reporting-date"
    }
  }
];

export const UPDATE_AFFILIATE_FORM_FIELDS = [
  {
    id: 1,
    name: "fullName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "FullNameLabel",
      type: "text",
      autoComplete: "full-name",
      material: true,
      readOnly: false,
      className: "single"
    }
  },
  {
    id: 2,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "EmailLabel",
      type: "email",
      autoComplete: "email",
      material: true,
      readOnly: true,
      className: "single"
    }
  },
  {
    id: 3,
    name: "lifetimeValue",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "LifetimeValueLabel",
      type: "number",
      material: true,
      readOnly: false,
      className: "single"
    }
  }
];

export const PROMOTE_AFFILIATE = ({ promotionsList }) => [
  {
    id: 5,
    name: "type",
    options: promotionsList,
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      className: "single"
    }
  }
];
