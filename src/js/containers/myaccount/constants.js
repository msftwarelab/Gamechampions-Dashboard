import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import { postFile } from "./actions";
import moment from "moment";
import epicDisplayName from "~components/custom/formLabel/epicDisplayName";
import DivDisplay from "~components/custom/formLabel/divDisplay";
export const REDUCER_NAME = "myAccount";
export const BONUS_REDUCER_NAME = "bonusTransactionHistory";
export const RETURN_URL = "/";
export const PROFILE_LOADING = `${REDUCER_NAME}/PROFILE_LOADING`;
export const PROFILE_ERROR = `${REDUCER_NAME}/PROFILE_ERROR`;
export const SET_PROFILE = `${REDUCER_NAME}/SET_PROFILE`;
export const RESET_PROFILE = `${REDUCER_NAME}/RESET_PROFILE`;
export const TRANSACTION_HISTORY = `${REDUCER_NAME}/TRANSACTION_HISTORY`;
export const SET_BONUS_TRANSACTION_HISTORY = `${REDUCER_NAME}/SET_BONUS_TRANSACTION_HISTORY`;
export const SET_PLAYER_BONUS_CAMPAIGN_STATUS = `${REDUCER_NAME}/SET_PLAYER_BONUS_CAMPAIGN_STATUS`;
export const RESET_PLAYER_BONUS_CAMPAIGN_STATUS = `${REDUCER_NAME}/RESET_PLAYER_BONUS_CAMPAIGN_STATUS`;
export const SET_PLAYER_LINKED_BONUS_CAMPAIGNS = `${REDUCER_NAME}/SET_PLAYER_LINKED_BONUS_CAMPAIGNS`;
export const RESET_PLAYER_LINKED_BONUS_CAMPAIGNS = `${REDUCER_NAME}/RESET_PLAYER_LINKED_BONUS_CAMPAIGNS`;
export const SET_HISTORY_PAGINATION = `${REDUCER_NAME}/SET_HISTORY_PAGINATION`;
export const SET_BONUS_PAGINATION = `${REDUCER_NAME}/SET_BONUS_PAGINATION`;
export const PAGE_SIZE_VALUE = 6;

const PLATFORM_TAGS = [
  { id: 0, value: "psnId", title: "PSN ID" },
  { id: 1, value: "xboxLive", title: "XBOX LIVE" },
  { id: 2, value: "eaAccount", title: "EA ACCOUNT" }
];

export const ProfileFormTypes = {
  Register: "Register",
  Facebook: "Facebook",
  EditProfile: "EditProfile",
  EditPassword: "EditPassword"
};

export const BANK_FORM_TYPES = {
  ALL: "All",
  SWIFT: "Swift",
  IBAN: "Iban"
};

export const DocumentType = {
  IdentityDocument: 1,
  ProofOfAdressDocument: 2
};

const REASON_OPTIONS = [
  { id: 0, value: 0, title: "Select Rejection Reason" },
  { id: 1, value: 1, title: "Invalid" },
  { id: 2, value: 2, title: "Not visible" },
  { id: 3, value: 3, title: "Invalid extension" }
];

export const DocumentRejectionReason = {
  InvalidIdDocument: 1,
  DocumentNotClearlyVisible: 2,
  InvalidDocumentExtension: 3,
  NotYetValidated: 0
};

export const DocumentValidationStatus = {
  NotYetValidated: 1,
  InvalidDocument: 2,
  DocumentValidated: 3
};

export const getProfileFormFields = ({
  formType,
  onSelectCountryChange = () => void 0,
  profile
}) => {
  const fields = {
    profileImage: {
      id: 0,
      name: "profileImage",
      componentType: FIELD_TYPES.IMAGE_UPLOAD,
      fieldProps: {
        title: "",
        label: "",
        alt: "",
        urlPrefix: "",
        defaultImage: "/img/icons/ic_account_circle-24px.svg",
        multiple: false,
        className: "profile-pic",
        imageUploadClassName: "profile-pic-upload",
        readOnly: false
      },
      onImageLoad: (file, target) =>
        postFile({
          file: target.result.substr(target.result.lastIndexOf(",") + 1),
          extension: file.name.substr(file.name.lastIndexOf(".") + 1)
        })
    },
    userName: {
      id: 1,
      name: "userName",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "UserNameLabel",
        type: "text",
        autoComplete: "user-name",
        material: true
      },
      validation: { required: "UserNameValidationRequired" }
    },
    fullName: {
      id: 2,
      name: "fullName",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "FullNameLabel",
        type: "text",
        autoComplete: "full-name",
        material: true
      },
      validation: { required: "FullNameValidationRequired" }
    },
    country: {
      id: 3,
      name: "country",
      componentType: FIELD_TYPES.DROP_DOWN,
      fieldProps: {
        label: "CountryLabel",
        autoComplete: "country",
        material: true,
        className: "single"
      },
      validation: { required: "CountryValidationRequired" }
    },
    city: {
      id: 4,
      name: "city",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "CityLabel",
        type: "text",
        autoComplete: "city",
        material: true
      },
      validation: { required: "CityValidationRequired" }
    },
    address: {
      id: 5,
      name: "address",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "StreetAddressLabel",
        type: "text",
        autoComplete: "address",
        material: true
      },
      validation: { required: "StreetAddressValidationRequired" }
    },
    contactNumber: {
      id: 6,
      name: "contactNumber",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        inputPattern: "[+]?[0-9]*",
        inputMode: "tel",
        label: "ContactNumberLabel",
        type: "tel",
        autoComplete: "contact-number",
        material: true
      },
      validation: {
        required: "ContactNumberValidationRequired",
        minLength: {
          value: 7,
          message: "ContactNumberValidationMin"
        }
      }
    },
    email: {
      id: 7,
      name: "email",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "EmailLabel",
        type: "email",
        autoComplete: "username",
        material: true
      },
      validation: { required: "EmailValidationRequired" }
    },
    password: {
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
    confirmPassword: {
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
    dateOfBirth: {
      id: 10,
      name: "dateOfBirth",
      componentType: FIELD_TYPES.DROPDOWN_DATE_PICKER,
      fieldProps: {
        label: "DateOfBirthLabel",
        type: "text",
        autoComplete: "dateOfBirth",
        material: true
      },
      validation: {
        validate: {
          required: value => !!value || "DateOfBirthValidationRequired",
          moreThen18: value =>
            moment(value) <= moment(Date.now()).subtract(18, "years") ||
            "DateOfBirthValidation18"
        }
      }
    },
    platform: {
      id: 11,
      name: "platform",
      options: PLATFORM_TAGS,
      componentType: FIELD_TYPES.DROP_DOWN,
      fieldProps: {
        autoComplete: "false",
        material: true
      }
    },
    tag: {
      id: 12,
      name: "tag",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "TagLabel",
        type: "text",
        material: true
      },
      validation: { required: "TagValidationRequired" }
    },
    acceptedTaC: {
      id: 13,
      name: "acceptedTaC",
      componentType: FIELD_TYPES.CHECK_BOX,
      fieldProps: {
        label: "RegisterTermsLabel",
        autoComplete: "remember-me",
        className: "single",
        material: true
      },
      validation: {
        required: "TermsAndConditionsMustBeAccepted"
      }
    },
    acceptedMarketingConsent: {
      id: 14,
      name: "acceptedMarketingConsent",
      componentType: FIELD_TYPES.CHECK_BOX,
      fieldProps: {
        label: "RegisterMarkettingLabel",
        autoComplete: "marketting",
        className: "single",
        material: true
      }
    },
    facebookId: {
      id: 16,
      name: "facebookId",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        type: "hidden",
        autoComplete: "facebookId"
      }
    },
    phoneNumber: {
      id: 17,
      componentType: FIELD_TYPES.PHONE_NUMBER,
      name: "phoneNumber",
      validation: {
        required: "PleaseProvideAPhoneNumber"
      },
      placeholder: "RegistrationPhoneNumberPlaceholder",
      material: true
    },
    documents: {
      id: 18,
      name: "documents",
      componentType: FIELD_TYPES.FILE_UPLOAD,
      fieldProps: {
        title: "",
        label: "UPLOAD ID OR PASSPORT",
        alt: "",
        urlPrefix: "",
        multiple: false,
        className: "profile-doc",
        helperText: "No documents have been uploaded yet!",
        fileUploadClassName: "profile-doc-upload",
        documents: profile?.get("documents")?.toJS(),
        readOnly: false
      },
      validation: { required: "ProfileDocValidationRequired" },
      onFileLoad: (file, target) =>
        postFile({
          file: target.result.substr(target.result.lastIndexOf(",") + 1),
          extension: file.name.substr(file.name.lastIndexOf(".") + 1),
          documentType: DocumentType.IdentityDocument,
          fileName: file.name
        })
    }
  };

  switch (formType) {
    case ProfileFormTypes.Register:
      return [
        {
          ...fields.userName,
          fieldProps: {
            ...fields.userName.fieldProps,
            className: "single"
          }
        },
        {
          ...fields.email,
          fieldProps: {
            ...fields.email.fieldProps,
            className: "single"
          }
        },
        {
          ...fields.password,
          fieldProps: {
            ...fields.password.fieldProps,
            className: "single"
          }
        },
        {
          ...fields.fullName,
          fieldProps: {
            ...fields.fullName.fieldProps,
            className: "single"
          }
        },
        {
          ...fields.country,
          fieldProps: {
            ...fields.country.fieldProps,
            className: "single",
            onChange: onSelectCountryChange
          }
        },
        {
          ...fields.dateOfBirth,
          fieldProps: {
            ...fields.dateOfBirth.fieldProps,
            className: "single"
          }
        },
        fields.acceptedTaC
      ];
    case ProfileFormTypes.Facebook:
      return [
        fields.userName,
        {
          ...fields.email,
          fieldProps: {
            ...fields.email.fieldProps,
            readOnly: true
          }
        },
        fields.country,
        fields.fullName,
        fields.dateOfBirth,
        fields.acceptedTaC,
        fields.facebookId
      ];
    case ProfileFormTypes.EditProfile:
      return [
        fields.profileImage,
        {
          ...fields.userName,
          fieldProps: {
            ...fields.userName.fieldProps,
            readOnly: true
          }
        },
        {
          ...fields.fullName,
          fieldProps: {
            ...fields.fullName.fieldProps,
            readOnly: true
          }
        },
        {
          ...fields.country,
          fieldProps: {
            ...fields.country.fieldProps,
            readOnly: true
          }
        },
        fields.city,
        fields.address,
        fields.contactNumber,
        {
          ...fields.dateOfBirth,
          fieldProps: {
            ...fields.dateOfBirth.fieldProps,
            readOnly: true
          }
        },
        fields.documents
      ];
    case ProfileFormTypes.EditPassword:
      return [fields.password, fields.confirmPassword];
  }
};

export const getBankDetailsFields = ({
  formType,
  bankName = null,
  swiftBic = null,
  iban = null,
  fullName,
  city,
  address,
  accountNumber,
  bankCountry,
  bankAddress
}) => {
  const fields = {
    fullName: {
      id: 21,
      name: "fullName",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "FullNameLabel",
        type: "text",
        autoComplete: "full-name",
        material: true,
        readOnly: !!fullName
      },
      validation: { required: "FullNameValidationRequired" }
    },
    iban: {
      id: 22,
      name: "iban",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "IBANLabel",
        type: "text",
        autoComplete: "IBAN",
        material: true,
        className: "width-full",
        isAlwaysOpen: true,
        readOnly: !!iban
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!value ||
            (watch("swiftBic") && watch("bankName")) ||
            "IBANValidationRequired"
        })
      }
    },
    paypalName: {
      id: 23,
      name: "payPalUserName",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        type: "hidden",
        autoComplete: "paypal-id"
      }
    },
    divDisplay: {
      id: 24,
      componentType: FIELD_TYPES.CUSTOM_FIELD,
      child: DivDisplay,
      className: "single"
    },
    name: {
      id: 25,
      name: "fullName",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "FullNameLabel",
        type: "text",
        autoComplete: "full-name",
        material: true,
        readOnly: !!fullName
      },
      validation: { required: "FullNameValidationRequired" }
    },
    country: {
      id: 26,
      name: "country",
      componentType: FIELD_TYPES.DROP_DOWN,
      fieldProps: {
        label: "CountryLabel",
        autoComplete: "country",
        material: true,
        className: "single",
        readOnly: true
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!(value || watch("iban")) || "CountryValidationRequired"
        })
      }
    },
    city: {
      id: 27,
      name: "city",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "CityLabel",
        type: "text",
        autoComplete: "city",
        material: true,
        readOnly: !!city
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!(value || watch("iban")) || "CityValidationRequired"
        })
      }
    },
    address: {
      id: 28,
      name: "address",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "StreetAddressLabel",
        type: "text",
        autoComplete: "address",
        material: true,
        readOnly: !!address
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!(value || watch("iban")) || "StreetAddressValidationRequired"
        })
      }
    },
    swiftBic: {
      id: 29,
      name: "swiftBic",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "SwiftBicLabel",
        type: "text",
        autoComplete: "SWIFT/BIC",
        material: true,
        className: "width-full",
        isAlwaysOpen: true,
        readOnly: !!swiftBic
      },
      validation: {
        watchValidate: watch => ({
          validate: value => !!(value || watch("iban")) || "SwiftBicRequired"
        })
      }
    },
    accountNumber: {
      id: 30,
      name: "accountNumber",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "AccountNumberLabel",
        type: "text",
        autoComplete: "account-number",
        material: true,
        readOnly: !!accountNumber
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!(value || watch("iban")) || "AccountNumberValidationRequired"
        })
      }
    },
    bankName: {
      id: 31,
      name: "bankName",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "BankNameLabel",
        type: "text",
        autoComplete: "bank-name",
        material: true,
        className: "width-full",
        isAlwaysOpen: true,
        readOnly: !!bankName
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!(value || watch("iban")) || "BankNameValidationRequired"
        })
      }
    },
    bankCountry: {
      id: 32,
      name: "bankCountry",
      componentType: FIELD_TYPES.DROP_DOWN,
      fieldProps: {
        label: "BankCountryLabel",
        autoComplete: "bank-country",
        material: true,
        className: "single",
        readOnly: !!bankCountry
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!(value || watch("iban")) || "BankCountryValidationRequired"
        })
      }
    },

    bankAddress: {
      id: 33,
      name: "bankAddress",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "BankAddressLabel",
        type: "text",
        autoComplete: "bankAddress",
        material: true,
        readOnly: !!bankAddress
      },
      validation: {
        watchValidate: watch => ({
          validate: value =>
            !!(value || watch("iban")) || "BankAddressValidationRequired"
        })
      }
    }
  };
  switch (formType) {
    case BANK_FORM_TYPES.ALL:
      return [
        fields.fullName,
        fields.iban,
        fields.paypalName,
        fields.divDisplay,
        fields.name,
        fields.country,
        fields.city,
        fields.address,
        fields.swiftBic,
        fields.accountNumber,
        fields.bankName,
        fields.bankCountry,
        fields.bankAddress
      ];
    case BANK_FORM_TYPES.SWIFT:
      return [
        fields.name,
        fields.country,
        fields.city,
        fields.address,
        fields.swiftBic,
        fields.accountNumber,
        fields.bankName,
        fields.bankCountry,
        fields.bankAddress
      ];
    case BANK_FORM_TYPES.IBAN:
      return [fields.fullName, fields.iban, fields.paypalName];
  }
};

export const FORM_FIELDS_GAMERTAGS = ({
  isBoyProfileExist = false,
  epicId = null,
  isVerified = false,
  eaAccount,
  psnId,
  xboxLive,
  activisionId,
  nba2KAccount,
  fortniteGamertag
}) => [
  {
    id: 41,
    name: "eaAccount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsEAAccountId",
      type: "text",
      autoComplete: "eaAccount",
      material: true,
      className: "width-full",
      isAlwaysOpen: true,
      readOnly: !!eaAccount
    }
  },
  {
    id: 42,
    name: "psnId",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsPSNId",
      type: "text",
      autoComplete: "psn-id",
      material: true,
      className: "width-full",
      isAlwaysOpen: true,
      readOnly: !!psnId
    }
  },
  {
    id: 43,
    name: "xboxLive",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsXBOXLIVE",
      type: "text",
      autoComplete: "xbox-live",
      className: "width-full",
      material: true,
      isAlwaysOpen: true,
      readOnly: !!xboxLive
    }
  },
  {
    id: 45,
    name: "activisionId",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ActivisionID",
      type: "text",
      autoComplete: "activisionID",
      className: "width-full",
      material: true,
      isAlwaysOpen: true,
      readOnly: !!activisionId
    }
  },
  {
    id: 46,
    name: "nba2KAccount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "Nba2KAccount",
      type: "text",
      autoComplete: "nba-2K-Account",
      className: "width-full",
      material: true,
      isAlwaysOpen: true,
      readOnly: !!nba2KAccount
    }
  },
  {
    id: 47,
    name: "fortniteGamertag",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "FortniteGamertag",
      type: "text",
      autoComplete: "fortnite-gamertag",
      className: "width-full",
      material: true,
      isAlwaysOpen: true,
      readOnly: !!fortniteGamertag
    }
  }
];

export const TRANSACTION_FORM_FIELDS = [
  {
    id: 1,
    name: "datetime",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      type: "text",
      label: "datetime",
      autoComplete: "datetime",
      material: true
    }
  },
  {
    id: 3,
    name: "balance",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "balance",
      autoComplete: "balance",
      material: true
    }
  },
  {
    id: 4,
    name: "amount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "amount",
      autoComplete: "amount",
      material: true
    }
  },
  {
    id: 5,
    name: "status",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "status",
      autoComplete: "status",
      material: true
    }
  }
];

export const getRejectionReasonFormFields = ({ onChange }) => [
  {
    id: 1,
    name: "rejectionReason",
    options: REASON_OPTIONS,
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "false",
      material: true,
      onChange: onChange
    }
  }
];
