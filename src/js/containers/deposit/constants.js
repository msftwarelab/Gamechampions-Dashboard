import moment from "moment";
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const IS_APCOPAY_ENABLED = true;
export const REDUCER_NAME = "deposit";
export const DEPOSIT_LOADING = `${REDUCER_NAME}/DEPOSIT_LOADING`;
export const SET_AMOUNT = `${REDUCER_NAME}/SET_AMOUNT`;
export const RESET_CARD = `${REDUCER_NAME}/RESET_CARD`;
export const SET_CARD = `${REDUCER_NAME}/SET_CARD`;
export const SET_DEPOSIT_ERROR = `${REDUCER_NAME}/SET_DEPOSIT_ERROR`;
export const RESET_DEPOSIT_ERROR = `${REDUCER_NAME}/RESET_DEPOSIT_ERROR`;
export const SET_SUCCESSFUL_PAYMENT = `${REDUCER_NAME}/SET_SUCCESSFUL_PAYMENT`;
export const SET_PROVIDER_URL = `${REDUCER_NAME}/SET_PROVIDER_URL`;
export const RESET_PROVIDER_URL = `${REDUCER_NAME}/RESET_PROVIDER_URL`;
export const SET_PAYMENT_PROVIDER = `${REDUCER_NAME}/SET_PAYMENT_PROVIDER`;
export const RESET_SUCCESSFUL_PAYMENT = `${REDUCER_NAME}/RESET_SUCCESSFUL_PAYMENT`;
export const SET_PAYMENT_REFERENCE = `${REDUCER_NAME}/SET_PAYMENT_REFERENCE`;
export const SET_BONUS_VALUES = `${REDUCER_NAME}/SET_BONUS_VALUES`;
export const SET_PROMO_CODE = `${REDUCER_NAME}/SET_PROMO_CODE`;
export const SET_IS_CONNECTION_CREATED = `${REDUCER_NAME}/SET_IS_CONNECTION_CREATED`;
export const SET_DEPOSIT_INFO = `${REDUCER_NAME}/SET_DEPOSIT_INFO`;

export const DEPOSIT_TRANSACTION_STEPS = {
  CHOOSE_AMOUNT: "choose-amount",
  PAYMENT_METHOD: "payment-method",
  COMPLETED: "completed"
};

export const PROVIDERS = {
  SYSPAY: 0,
  APCOPAY: 1,
  SKRILL: 2,
  GIROPAY: 3,
  OPENBANK: 4,
  IDEAL: 5,
  SOFORT: 6,
  BANCONTACT: 7,
  P24: 8,
  EPS: 9,
  PAYPAL: 10
};

export const PROVIDERS_TAG = {
  [PROVIDERS.GIROPAY]: "giropay",
  [PROVIDERS.OPENBANK]: "op",
  [PROVIDERS.IDEAL]: "ideal",
  [PROVIDERS.SOFORT]: "directpay",
  [PROVIDERS.BANCONTACT]: "bancontact",
  [PROVIDERS.P24]: "p24",
  [PROVIDERS.EPS]: "eps"
};

export const PROVIDERS_CONFIGURATION = {
  [PROVIDERS.SYSPAY]: { getComponent: () => import("./syspayForm") },
  [PROVIDERS.APCOPAY]: { isIFrameProvider: true },
  [PROVIDERS.SKRILL]: { isIFrameProvider: true },
  [PROVIDERS.GIROPAY]: { isHostedPage: true },
  [PROVIDERS.OPENBANK]: { isHostedPage: true },
  [PROVIDERS.IDEAL]: { isHostedPage: true },
  [PROVIDERS.SOFORT]: { isHostedPage: true },
  [PROVIDERS.BANCONTACT]: { isHostedPage: true },
  [PROVIDERS.P24]: { isHostedPage: true },
  [PROVIDERS.EPS]: { isHostedPage: true },
  [PROVIDERS.PAYPAL]: { isIFrameProvider: true }
};

export const PROVIDERS_CONTENT = {
  [PROVIDERS.SYSPAY]: {
    title: "Credit Card",
    logo: "visa-mastercard.png"
  },
  [PROVIDERS.APCOPAY]: {
    title: "Credit Card",
    logo: "visa-mastercard.png"
  },
  [PROVIDERS.SKRILL]: { title: "Skrill", logo: "skrill.png" },
  [PROVIDERS.GIROPAY]: { title: "GiroPay", logo: "giropay.png" },
  [PROVIDERS.OPENBANK]: { title: "Open Banking", logo: "open-bank.png" },
  [PROVIDERS.IDEAL]: { title: "Ideal", logo: "ideal.png" },
  [PROVIDERS.SOFORT]: { title: "Sofort", logo: "sofort.png" },
  [PROVIDERS.BANCONTACT]: { title: "BanContact", logo: "bancontact.png" },
  [PROVIDERS.P24]: { title: "P24", logo: "p24.png" },
  [PROVIDERS.EPS]: { title: "EPS", logo: "eps.png" },
  [PROVIDERS.PAYPAL]: { title: "PayPal", logo: "paypal.jpg" }
};

export const AMOUNT_OPTIONS = [
  { id: 3, value: 10, label: "ChooseAmountTen" },
  { id: 5, value: 20, label: "ChooseAmountTwenty" },
  { id: 6, value: 50, label: "ChooseAmountFiftty" },
  { id: 7, value: 100, label: "ChooseAmountHundred" }
];

export const DEPOSIT_TRANSACTION_TYPE = "deposit";

export const getDepositFormFields = ({
  handleOnChange,
  formFieldValues = {}
}) => [
  {
    id: 1,
    name: "cardNumber",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      inputPattern: "[0-9]*",
      inputMode: "numeric",
      label: "CreditCardNumber",
      type: "number",
      placeholder: "CreditCardNumberPlaceholder",
      material: true,
      className: "single",
      isAlwaysOpen: true,
      onChange: (value, setValue) => {
        setValue("cardNumber", value?.substring(0, 16));
        handleOnChange("number", value?.substring(0, 16));
      }
    },
    validation: {
      required: "CreditCardNumberRequired",
      minLength: {
        value: 16,
        message: "CreditCardNumberLength"
      },
      maxLength: {
        value: 16,
        message: "CreditCardNumberLength"
      }
    }
  },
  {
    id: 2,
    name: "cardHolderFullName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "CardHolderName",
      type: "text",
      material: true,
      className: "single",
      isAlwaysOpen: true,
      onChange: value => {
        handleOnChange("name", value);
      }
    },
    validation: {
      required: "CardHolderNameRequired",
      minLength: {
        value: 2,
        message: "CardHolderNameLength"
      }
    }
  },
  {
    id: 3,
    name: "expirationDate",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      inputPattern: "(0[1-9]|10|11|12)/[0-9]{2}",
      inputMode: "numeric",
      label: "CardExpirationDate",
      type: "text",
      placeholder: "MonthAndYear",
      className: "double",
      material: true,
      isAlwaysOpen: true,
      onChange: (value, setValue) => {
        const { expiry = "" } = formFieldValues;
        let finalValue = value?.substring(0, 5);

        if (expiry.length === 3 && value.length === 2) {
          finalValue = value?.substring(0, 1);
        }

        if (expiry.length === 1 && value.length === 2) {
          finalValue = value + "/";
        }

        const expireDateArr = finalValue.split("/");
        const month = expireDateArr[0];
        const year = expireDateArr.length === 2 ? expireDateArr[1] : "";
        const currentYear = moment().format("YY");

        if (
          (month && isNaN(month)) ||
          (year && isNaN(year)) ||
          (month &&
            !isNaN(month) &&
            (month < 0 || month > 12 || month === "00")) ||
          (year && year[0] < currentYear[0])
        ) {
          handleOnChange("expiry", expiry);
          setValue("expirationDate", expiry);
          return;
        }

        handleOnChange("expiry", finalValue);
        setValue("expirationDate", finalValue);
      }
    },
    validation: {
      validate: {
        year: value =>
          (value.length == 5 &&
            value?.substring(3, 5) >= parseInt(moment().format("YY"))) ||
          "CardExpirationDateValidateYear"
      },
      required: "",
      minLength: {
        value: 5,
        message: "CardExpirationDateLength"
      },
      maxLength: {
        value: 5,
        message: "CardExpirationDateLength"
      },
      pattern: {
        value: /(0[1-9]|10|11|12)\/([0-9]{2})$/,
        message: "CardExpirationDatePattern"
      }
    }
  },
  {
    id: 5,
    name: "cvc",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      inputPattern: "[0-9]*",
      inputMode: "numeric",
      label: "CardCVC",
      type: "number",
      className: "double",
      material: true,
      isAlwaysOpen: true,
      onChange: (value, setValue) => {
        setValue("cvc", value?.substring(0, 3));
        handleOnChange("cvc", value?.substring(0, 3));
      }
    },
    validation: {
      required: "CardCVCRequired",
      minLength: {
        value: 3,
        message: "CardCVCLength"
      },
      maxLength: {
        value: 3,
        message: "CardCVCLength"
      }
    }
  }
];

export const getToggleFormFields = ({ handleOnChange }) => [
  {
    id: 1,
    name: "isFormVisible",
    componentType: FIELD_TYPES.CHECK_BOX,
    fieldProps: {
      label: "Use another card",
      material: true,
      onClick: handleOnChange
    }
  }
];

export const DEPOSIT_AVAILABLE_AMOUNTS = [10, 15, 20];
export const DEPOSIT_DEFAULT_AMOUNTS = 10;
