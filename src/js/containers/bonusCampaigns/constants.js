import { Separator } from "~components/molecules";
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "bonusCampaigns";
export const SET_LOADING = `${REDUCER_NAME}/SET_LOADING`;
export const SET_ERROR = `${REDUCER_NAME}/SET_ERROR`;
export const SET_BONUSES = `${REDUCER_NAME}/SET_BONUSES`;
export const SET_SELECTED_BONUS = `${REDUCER_NAME}/SET_SELECTED_BONUS`;
export const REMOVE_BONUS = `${REDUCER_NAME}/REMOVE_BONUS`;
export const ADD_BONUS = `${REDUCER_NAME}/ADD_BONUS`;
export const UPDATE_BONUS = `${REDUCER_NAME}/UPDATE_BONUS`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const SET_DIRECT_BONUSES = `${REDUCER_NAME}/SET_DIRECT_BONUSES`;
export const PAGE_SIZE_VALUE = 12;
export const RETURN_URL = "/";
export const DEFAULT_ACTION = "view";
export const CREATE_ACTION = "create";

export const BONUS_CAMPAIGN_TYPE = {
  DEPOSIT: 1,
  DIRECT: 2
};

export const FORM_FIELDS = ({
  OnChange,
  OnDirectBonusChange,
  isPublic,
  isDirectBonus
}) => {
  let publicBonusForm = [
    {
      id: 3,
      name: "percentageBonus",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        inputPattern: "[0-9]*",
        inputMode: "numeric",
        label: "PercentageBonusLabel",
        type: "number",
        autoComplete: "percentageBonus",
        material: true
      },
      validation: {
        required: "PercentageBonusValidationRequired"
      }
    },
    {
      id: 4,
      name: "dateFrom",
      componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
      fieldProps: {
        label: "DateFromLabel",
        type: "text",
        autoComplete: "dateFrom",
        material: true
      },
      validation: {
        validate: {
          required: value => !!value || "DateFromValidationRequired"
        }
      }
    },
    {
      id: 5,
      name: "dateTo",
      componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
      fieldProps: {
        label: "DateToLabel",
        type: "text",
        autoComplete: "dateTo",
        material: true
      },
      validation: {
        validate: {
          required: value => !!value || "DateToValidationRequired"
        }
      }
    },
    {
      id: 6,
      name: "depositFrom",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "DepositFromLabel",
        type: "number",
        autoComplete: "depositFrom",
        step: "0.01",
        material: true
      },
      validation: {
        required: "DepositFromValidationRequired"
      }
    },
    {
      id: 7,
      name: "depositTo",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "DepositToLabel",
        type: "number",
        autoComplete: "depositTo",
        step: "0.01",
        material: true
      },
      validation: {
        required: "DepositToValidationRequired"
      }
    },
    {
      id: 8,
      name: "separator",
      componentType: FIELD_TYPES.CUSTOM_FIELD,
      child: Separator,
      className: "single",
      fieldStyle: {
        margin: "1rem 0 1rem 0"
      }
    },
    {
      id: 9,
      name: "isPublic",
      componentType: FIELD_TYPES.CHECK_BOX,
      fieldProps: {
        label: "IsPublicLabel",
        material: true,
        onClick: OnChange
      }
    }
  ];

  let directBonusForm = [
    {
      id: 11,
      name: "betMultiplierRequirements",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        inputPattern: "[0-9]*",
        inputMode: "numeric",
        label: "WagerMultiplierLabel",
        type: "number",
        autoComplete: "betMultiplierRequirements",
        material: true
      },
      validation: {
        required: "WagerMultiplierValidationRequired"
      }
    },
    {
      id: 12,
      name: "expirationInDays",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "ExpiryDateLabel",
        type: "number",
        autoComplete: "expirationInDays",
        step: "1",
        material: true
      },
      validation: {
        required: "ExpiryDateValidationRequired"
      }
    }
  ];

  let forms = [
    {
      id: 0,
      name: "isDirectBonus",
      componentType: FIELD_TYPES.CHECK_BOX,
      fieldProps: {
        label: "IsDirectBonus",
        material: true,
        onClick: OnDirectBonusChange
      }
    },
    {
      id: 1,
      name: "seperator",
      componentType: FIELD_TYPES.CUSTOM_FIELD,
      child: Separator,
      className: "single",
      fieldStyle: {
        margin: "0"
      }
    },
    {
      id: 2,
      name: "title",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "Title",
        type: "text",
        autoComplete: "title",
        material: true
      },
      validation: { required: "TitleValidationRequired" }
    }
  ];

  forms = !isDirectBonus
    ? forms.concat(publicBonusForm)
    : forms.concat(directBonusForm);

  !isDirectBonus &&
    !isPublic &&
    forms.push({
      id: 13,
      name: "promoCode",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "PromoCodeLabel",
        type: "text",
        autoComplete: "promoCode",
        material: true
      }
    });

  return forms;
};
