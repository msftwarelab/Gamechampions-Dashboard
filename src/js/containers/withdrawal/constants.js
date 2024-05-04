import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "withdrawal";
export const SET_AMOUNT = `${REDUCER_NAME}/SET_AMOUNT`;

export const WITHDRAWAL_TRANSACTION_STEPS = {
  CHOOSE_AMOUNT: "choose-amount",
  PERSONAL_INFO: "personal-info",
  PAYMENT_METHOD: "payment-method",
  VERIFY: "verify"
};

export const WITHDRAWAL_TYPE = {
  GIFT_CARD: 1,
  SWIFT_TRANSFER: 2,
  EU_SEPA_TRANSFER: 3
};

export const WITHDRAWAL_MINIMUM_AMOUNT_GIFT = 20;
export const WITHDRAWAL_MINIMUM_AMOUNT = 40;

export const WITHDRAWAL_TRANSACTION_TYPE = "withdrawal";

export const getFormFields = ({ maxAccountValue }) => [
  {
    id: 1,
    name: "amount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      inputPattern: "[0-9]*",
      inputMode: "numeric",
      label: "AmountLabel",
      type: "number",
      autoComplete: "amount",
      material: true,
      className: "amount"
    },

    validation: {
      validate: {
        required: value => !!value || "AmountValidationRequired",
        minAmount: value => parseInt(value) >= 40 || "AmountValidationMin",
        maxAmount: value =>
          parseInt(value) <= maxAccountValue || "AmountValidationMax"
      }
    }
  }
];

export const getWithdrawalFields = ({ max, amount, onChange }) => [
  {
    id: 1,
    name: "withdrawalAmount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "number",
      min: "0",
      max: max,
      autoComplete: "withdrawalAmount",
      material: true,
      className: "form-field__input__withdrawal",
      value: amount,
      onChange: onChange
    }
  }
];
