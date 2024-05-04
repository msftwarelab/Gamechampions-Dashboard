import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "promotionsAdmin";
export const PROMOTIONS_LOADING = `${REDUCER_NAME}/PROMOTIONS_LOADING`;
export const PROMOTIONS_ERROR = `${REDUCER_NAME}/PROMOTIONS_ERROR`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const SET_PROMOTIONS = `${REDUCER_NAME}/SET_PROMOTIONS`;
export const SET_COMMISSION_TYPE = `${REDUCER_NAME}/SET_COMMISSION_TYPE`;
export const SET_SELECTED_PROMOTION = `${REDUCER_NAME}/SET_SELECTED_PROMOTION`;
export const RESET_SELECTED_PROMOTION = `${REDUCER_NAME}/RESET_SELECTED_PROMOTION`;
export const UPDATE_PROMOTION = `${REDUCER_NAME}/UPDATE_PROMOTION`;
export const ADD_PROMOTION = `${REDUCER_NAME}/ADD_PROMOTION`;
export const PAGE_SIZE_VALUE = 10;
export const RETURN_URL = "/promotions";
export const DEFAULT_ACTION = "view";
export const CREATE_ACTION = "create";
export const MEDIUM_QUERY_PARAM_NAME = "&IWMedium=";

//Translateble keys.
export const PROMOTION_ACTION_TYPE = {
  1: "PromotionActionDeposit",
  2: "PromotionActionPayout",
  3: "PromotionActionGameplay",
  4: "PromotionActionCompletedMatch",
  5: "PlayerDefaultPromotion"
};

//Translateble keys.
export const PROMOTION_COMMISSION_TYPE = {
  1: "PromotionCommissionTypeCommission",
  2: "PromotionCommissionTypeFixed"
};

export const CREATE_PROMOTION_FORM_FIELDS = ({
  actionList,
  commissionTypeList,
  onCommissionTypeChange,
  fixed,
  commission
}) => [
  {
    id: 1,
    name: "title",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      label: "CreatePromotionTitle",
      material: true,
      className: "single"
    },
    validation: { required: "TitleValidationRequired" }
  },
  {
    id: 2,
    name: "description",
    componentType: FIELD_TYPES.TEXT_AREA,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      label: "CreatePromotionDesription",
      material: true,
      className: "single"
    }
  },
  {
    id: 3,
    name: "promotionActionType",
    options: Object.keys(actionList).map(action => {
      return { id: action, title: actionList[action] };
    }),
    componentType: FIELD_TYPES.DROP_DOWN,
    initialValue: Object.keys(actionList)[0],
    fieldProps: {
      autoComplete: "off",
      material: true
    },
    validation: {
      watchValidate: () => ({
        validate: value => value !== "0" || "ConfirmPromotionActionType"
      })
    }
  },
  {
    id: 4,
    name: "promotionCommissionType",
    options: Object.keys(commissionTypeList).map(commission => {
      return { id: commission, title: commissionTypeList[commission] };
    }),
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      onChange: onCommissionTypeChange
    },
    validation: {
      watchValidate: () => ({
        validate: value => value !== "0" || "ConfirmPromotionCommissionType"
      })
    }
  },
  {
    id: 5,
    name: "commission",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "PromotionsTableForthColumn",
      type: "number",
      material: true,
      readOnly: commission ? false : true
    },
    validation: {
      watchValidate: watch => ({
        validate: value =>
          (watch("promotionCommissionType") == "1" && value != "") ||
          (watch("promotionCommissionType") == "2" && value == "") ||
          "ConfirmPromotionCommission"
      })
    }
  },
  {
    id: 6,
    name: "fixedCommission",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "PromotionsTableFifthColumn",
      type: "number",
      material: true,
      readOnly: fixed ? false : true
    },
    validation: {
      watchValidate: watch => ({
        validate: value =>
          (watch("promotionCommissionType") == "2" && value != "") ||
          (watch("promotionCommissionType") == "1" && value == "") ||
          "ConfirmPromotionFixedCommission"
      })
    }
  }
];
