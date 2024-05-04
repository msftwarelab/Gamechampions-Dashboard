import moment from "moment";
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import { Separator } from "~components/molecules";
import { TRANSACTION_TYPE } from "~service/transactionHistory/adapter";
import { BONUS_TRANSACTION_TYPE } from "~service/constants";
import DivDisplay from "~components/custom/formLabel/divDisplay";
import playerDocuments from "~components/custom/players/playerDocuments";

export const REDUCER_NAME = "players";
export const PLAYERS_LOADING = `${REDUCER_NAME}/PLAYERS_LOADING`;
export const PLAYERS_ERROR = `${REDUCER_NAME}/PLAYERS_ERROR`;
export const SET_PLAYERS = `${REDUCER_NAME}/SET_PLAYERS`;
export const UPDATE_PLAYER = `${REDUCER_NAME}/UPDATE_PLAYER`;
export const SET_SELECTED_PLAYER = `${REDUCER_NAME}/SET_SELECTED_PLAYER`;
export const RESET_SELECTED_PLAYER = `${REDUCER_NAME}/RESET_SELECTED_PLAYER`;
export const SET_SELECTED_PLAYER_BALANCE = `${REDUCER_NAME}/SET_SELECTED_PLAYER_BALANCE`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const SET_TRANSACTIONS = `${REDUCER_NAME}/SET_TRANSACTIONS`;
export const SET_TRANSACTIONS_PAGINATION = `${REDUCER_NAME}/SET_TRANSACTIONS_PAGINATION`;
export const TRANSACTIONS_LOADING = `${REDUCER_NAME}/TRANSACTIONS_LOADING`;
export const SET_MATCHES = `${REDUCER_NAME}/SET_MATCHES`;
export const SET_MATCHES_PAGINATION = `${REDUCER_NAME}/SET_MATCHES_PAGINATION`;
export const MATCHES_LOADING = `${REDUCER_NAME}/MATCHES_LOADING`;
export const UPDATE_TRANSACTION = `${REDUCER_NAME}/UPDATE_TRANSACTION`;
export const SET_PLAYER_XP_POINTS = `${REDUCER_NAME}/SET_PLAYER_XP_POINTS`;
export const UPDATE_MATCH = `${REDUCER_NAME}/UPDATE_MATCH`;
export const SET_SELECTED_MATCH = `${REDUCER_NAME}/SET_SELECTED_MATCH`;
export const SET_ACTIVE_TOURNAMENTS = `${REDUCER_NAME}/SET_ACTIVE_TOURNAMENTS`;
export const CANCELL_MATCH_LOADING = `${REDUCER_NAME}/CANCELL_MATCH_LOADING`;
export const CURRENTPAGE_QUERY_STRING_PARAM = "currentPage";
export const SET_PLAYER_BOY_PROFILE = `${REDUCER_NAME}/SET_PLAYER_BOY_PROFILE`;

export const PAGE_SIZE_VALUE = 12;
export const TRANSACTIONS_PAGE_SIZE_VALUE = 5;
export const MATCHES_PAGE_SIZE_VALUE = 5;
export const PLAYER_BALANCE_INTERVAL_TIME = 2000;
export const DEBOUNCE_TIME = 500;
export const BARRING_TYPE = {
  1: "Permanent",
  2: "TimeRestrained",
  3: "MutePlayer"
};
export const GROUP_TYPE = {
  1: "Rabbits",
  2: "Lions"
};

export const WITHDRAWAL_TYPE = {
  GIFT_CARD: 1,
  SWIFT_TRANSFER: 2,
  EU_SEPA_TRANSFER: 3
};

export const AVAILABLE_CREDIT_SUBTYPE = {
  1: "Manual Purge(-)",
  2: "Premium Charge(-)",
  3: "Fine(-)",
  4: "Tournament Prize(+)",
  5: "Game Error Credit(+)",
  6: "Promotion(+)",
  7: "Referral(+)",
  8: "Store Purchase(-)"
};

export const GAMES = {
  1: "FIFA",
  2: "MADDEN",
  3: "NBA",
  4: "WARZONE",
  5: "Fortnite",
  6: "League Of Legends",
  7: "PubG"
};

const AVAILABLE_CREDIT_SUBTYPE_DROPDOWN_OPTIONS = Object.keys(
  AVAILABLE_CREDIT_SUBTYPE
).map(v => {
  return { id: v, title: AVAILABLE_CREDIT_SUBTYPE[v] };
});

const GAMES_DROPDOWN_OPTIONS = Object.keys(GAMES).map(v => {
  return { id: v, title: GAMES[v] };
});

export const getBlockFormFields = ({ onRadioChange, isPermanent }) => [
  {
    id: 1,
    name: "barringType",
    autoComplete: "barringType",
    options: [
      { id: 1, value: 1, label: `BarringType${BARRING_TYPE[1]}` },
      { id: 2, value: 2, label: `BarringType${BARRING_TYPE[2]}` }
    ],
    componentType: FIELD_TYPES.RADIO_GROUP,
    fieldProps: {
      onChange: onRadioChange,
      material: true
    }
  },
  {
    id: 2,
    name: "barringEndDate",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      label: "BarringEndDate",
      type: "text",
      autoComplete: "BarringEndDate",
      material: true,
      readOnly: isPermanent()
    },
    validation: {
      validate: {
        required: value =>
          isPermanent() || !!value || "DateOfBirthValidationRequired",
        moreThanOneDay: value =>
          isPermanent() ||
          moment(value) > moment(Date.now()) ||
          "BarringEndDateValidation"
      }
    }
  }
];

export const getFormFields = ({ onSearchChange }) => [
  {
    id: 1,
    name: "search",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      placeholder: "SearchPlayers",
      material: true,
      className: "single",
      onChange: onSearchChange
    }
  }
];
export const getMatchesFormFields = ({
  onSearchChange,
  onSelectChange,
  matchStatusList
}) => [
  {
    id: 1,
    name: "search",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      placeholder: "SearchMatches",
      material: true,
      onChange: onSearchChange
    }
  },
  {
    id: 2,
    name: "type",
    options: Object.keys(matchStatusList).map(status => {
      return {
        id: matchStatusList[status],
        title: status.split("_").join(" ")
      };
    }),
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      onChange: onSelectChange
    }
  }
];
export const getTransactionsFormFields = ({
  onSelectChange,
  onSearchChange
}) => [
  {
    id: 1,
    name: "amount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      placeholder: "SearchTransactions",
      type: "number",
      material: true,
      onChange: onSearchChange
    }
  },
  {
    id: 2,
    name: "type",
    options: Object.keys(TRANSACTION_TYPE).map(v => {
      return { id: v, title: TRANSACTION_TYPE[v] };
    }),
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      onChange: onSelectChange
    }
  }
];
export const getBonusTransactionsFormFields = ({
  onSelectChange,
  onSearchChange
}) => [
  {
    id: 1,
    name: "amount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      placeholder: "SearchTransactions",
      type: "number",
      material: true,
      onChange: onSearchChange
    }
  },
  {
    id: 2,
    name: "type",
    options: Object.keys(BONUS_TRANSACTION_TYPE).map(v => {
      return { id: v, title: BONUS_TRANSACTION_TYPE[v] };
    }),
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      onChange: onSelectChange
    }
  }
];

export const getWithdrawFormFields = ({ maxAccountValue }) => [
  {
    id: 1,
    name: "amount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "AmountLabel",
      type: "number",
      autoComplete: "amount",
      material: true,
      className: "amount"
    },
    validation: {
      required: "AmountValidationRequired",
      min: {
        value: 1,
        message: "AmountValidationMin"
      },
      max: {
        value: maxAccountValue,
        message: "AmountValidationMax"
      }
    }
  }
];

export const FORM_FIELDS_PLAYER_XP_POINTS = ({ onSelectChange, label }) => [
  {
    id: 2,
    name: "games",
    options: GAMES_DROPDOWN_OPTIONS,
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      onChange: onSelectChange
    }
  },
  {
    id: 1,
    name: "xpPoint",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "PlayerXpPoints",
      type: "number",
      autoComplete: "xpPoint",
      material: true
    }
  },
  {
    id: 3,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: label
  }
];

export const FORM_FIELDS_PROFILE = ({
  selectedPlayer,
  onSetPlayer,
  onDeletePlayerDocument,
  onValidatePlayerDocument,
  history,
  selectedLanguage,
  returnUrl
}) => [
  {
    id: 0,
    name: "seperatorProfileDetils",
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: Separator,
    heading: "SeperatorProfileDetilsHeading",
    className: "single",
    fieldStyle: {
      margin: "1.25rem 0 1rem 0"
    }
  },
  {
    id: 1,
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
      readOnly: true
    }
  },

  {
    id: 2,
    name: "id",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "IdLabel",
      type: "text",
      autoComplete: "id",
      material: true
    }
  },
  {
    id: 3,
    name: "userName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "UserNameLabel",
      type: "text",
      autoComplete: "user-name",
      material: true,
      readOnly: false
    }
  },
  {
    id: 4,
    name: "fName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "FullNameLabel",
      type: "text",
      autoComplete: "f-name",
      material: true,
      readOnly: false
    }
  },
  {
    id: 5,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "EmailLabel",
      type: "email",
      autoComplete: "email",
      material: true,
      readOnly: true
    }
  },
  {
    id: 6,
    name: "contactNumber",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ContactNumberLabel",
      type: "tel",
      autoComplete: "contact-number",
      material: true,
      readOnly: false
    }
  },
  {
    id: 7,
    name: "userAddress",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "StreetAddressLabel",
      type: "text",
      autoComplete: "address",
      material: true,
      className: "single",
      readOnly: false
    }
  },
  {
    id: 8,
    name: "userCity",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "CityLabel",
      type: "text",
      autoComplete: "city",
      material: true,
      readOnly: false
    }
  },
  {
    id: 9,
    name: "userCountry",
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      label: "CountryLabel",
      autoComplete: "country",
      material: true
    }
  },
  {
    id: 10,
    name: "dateOfBirth",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      label: "DateOfBirthLabel",
      type: "text",
      autoComplete: "dateOfBirth",
      material: true,
      readOnly: false
    }
  },
  {
    id: 11,
    name: "platformId",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "PlatformIdLabel",
      type: "text",
      autoComplete: "platform-id",
      material: true,
      readOnly: false
    }
  },
  {
    id: 12,
    name: "isBlocked",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "playerIsBlocked",
      type: "text",
      material: true,
      readOnly: false
    }
  },
  {
    id: 13,
    name: "barringEndDate",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "barringEndDate",
      type: "text",
      material: true,
      readOnly: false
    }
  },
  {
    id: 14,
    name: "seperatorProfileBank",
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: Separator,
    heading: "SeperatorProfileBankHeading",
    className: "single",
    fieldStyle: {
      margin: "1rem 0"
    }
  },
  {
    id: 15,
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
    id: 16,
    name: "iban",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "IBANLabel",
      type: "text",
      autoComplete: "IBAN",
      material: true,
      className: "width-full",
      isAlwaysOpen: true,
      readOnly: false
    }
  },
  {
    id: 17,
    name: "payPalUserName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "hidden",
      autoComplete: "paypal-id"
    }
  },
  {
    id: 18,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: DivDisplay,
    className: "single"
  },
  {
    id: 19,
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
    id: 20,
    name: "country",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "CountryLabel",
      autoComplete: "country",
      material: true,
      readOnly: false
    }
  },
  {
    id: 21,
    name: "city",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "CityLabel",
      type: "text",
      autoComplete: "city",
      material: true
    }
  },
  {
    id: 22,
    name: "address",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "StreetAddressLabel",
      type: "text",
      autoComplete: "address",
      material: true
    }
  },
  {
    id: 23,
    name: "swiftBic",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "SwiftBicLabel",
      type: "text",
      autoComplete: "SWIFT/BIC",
      material: true,
      className: "width-full",
      isAlwaysOpen: true,
      readOnly: false
    }
  },
  {
    id: 24,
    name: "accountNumber",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "AccountNumberLabel",
      type: "text",
      autoComplete: "account-number",
      material: true
    }
  },
  {
    id: 25,
    name: "bankName",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "BankNameLabel",
      type: "text",
      autoComplete: "bank-name",
      material: true,
      className: "width-full",
      isAlwaysOpen: true,
      readOnly: false
    }
  },
  {
    id: 26,
    name: "bankCountry",
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      label: "BankCountryLabel",
      autoComplete: "bank-country",
      material: true,
      className: "single"
    }
  },
  {
    id: 27,
    name: "bankAddress",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "BankAddressLabel",
      type: "text",
      autoComplete: "bankAddress",
      material: true
    }
  },
  {
    id: 28,
    name: "seperatorProfileTag",
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: Separator,
    heading: "SeperatorProfileTagHeading",
    className: "single",
    fieldStyle: {
      margin: "1rem 0"
    }
  },
  {
    id: 29,
    name: "psnId",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsPSNId",
      type: "text",
      autoComplete: "psn-id",
      material: true,
      className: "width-full",
      isAlwaysOpen: true
    }
  },
  {
    id: 30,
    name: "xboxLive",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsXBOXLIVE",
      type: "text",
      autoComplete: "xbox-live",
      className: "width-full",
      material: true,
      isAlwaysOpen: true
    }
  },
  {
    id: 31,
    name: "eaAccount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsEAAccountId",
      type: "text",
      autoComplete: "eaAccount",
      material: true,
      className: "width-full",
      isAlwaysOpen: true
    }
  },
  {
    id: 32,
    name: "activisionId",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsActivisionId",
      type: "text",
      autoComplete: "activisionId",
      material: true,
      className: "width-full",
      isAlwaysOpen: true
    }
  },
  {
    id: 33,
    name: "nba2KAccount",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "GamerTagsNBA2KAccount",
      type: "text",
      autoComplete: "nba2KAccount",
      material: true,
      className: "width-full",
      isAlwaysOpen: true
    }
  },
  {
    id: 34,
    name: "fortniteGamertag",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "fortniteGamertag",
      type: "text",
      autoComplete: "fortnite-gamertag",
      material: true,
      className: "width-full",
      isAlwaysOpen: true
    }
  },
  {
    id: 35,
    name: "seperatorProfileGroup",
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: Separator,
    heading: "SeperatorProfileGroupHeading",
    className: "single",
    fieldStyle: {
      margin: "1rem 0"
    }
  },
  {
    id: 36,
    name: "group",
    options: Object.keys(GROUP_TYPE).map(v => {
      return { id: v, title: GROUP_TYPE[v] };
    }),
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true
    }
  },
  {
    id: 37,
    name: "registrationIpAddress",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "RegistrationIpAddress",
      type: "text",
      autoComplete: "registrationIpAddress",
      material: true,
      readOnly: true
    }
  },
  {
    id: 38,
    name: "loginIpAddress",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "LoginIpAddress",
      type: "text",
      autoComplete: "loginIpAddress",
      material: true,
      readOnly: true
    }
  },
  {
    id: 39,
    name: "seperatorProfileGroup",
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: Separator,
    heading: "SeperatorProfileDocumentsHeading",
    className: "single",
    fieldStyle: {
      margin: "1rem 0"
    }
  },
  {
    id: 40,
    name: "documents",
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: playerDocuments,
    heading: "SeperatorProfileDocumentsHeading",
    className: "single",
    fieldStyle: {
      margin: "0 0 1rem 0"
    },
    fieldProps: {
      selectedPlayer,
      onSetPlayer,
      onDeletePlayerDocument,
      onValidatePlayerDocument,
      history,
      selectedLanguage,
      returnUrl
    }
  }
];

export const getCreditFormFields = ({
  onSelectCreditTypeChange,
  bonusCampaignOptions
}) => {
  let form = [
    {
      id: 1,
      name: "amount",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "AmountLabel",
        type: "number",
        autoComplete: "amount",
        material: true,
        className: "amount"
      },

      validation: {
        validate: {
          required: value => !!value || "AmountValidationRequired"
        }
      }
    },
    {
      id: 2,
      name: "creditType",
      componentType: FIELD_TYPES.DROP_DOWN,
      options: AVAILABLE_CREDIT_SUBTYPE_DROPDOWN_OPTIONS,
      className: "single",
      fieldProps: {
        autoComplete: "false",
        className: "single",
        material: true,
        onChange: onSelectCreditTypeChange
      }
    }
  ];

  bonusCampaignOptions &&
    bonusCampaignOptions.length &&
    form.push({
      id: 3,
      name: "bonusCampaignId",
      options: bonusCampaignOptions,
      componentType: FIELD_TYPES.DROP_DOWN,
      className: "single",
      fieldProps: {
        label: "BonusCampaignDropdownLabel",
        autoComplete: "false",
        className: "single",
        material: true
      },

      validation: {
        validate: {
          required: value =>
            !!value || "BonusCampaignDropdownValidationRequired"
        }
      }
    });

  return form;
};

export const getCreditBonusFormFields = ({ bonusCampaignOptions }) => {
  let form = [
    {
      id: 1,
      name: "amount",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "AmountLabel",
        type: "number",
        autoComplete: "amount",
        material: true,
        className: "amount"
      },

      validation: {
        validate: {
          required: value => !!value || "AmountValidationRequired"
        }
      }
    }
  ];

  bonusCampaignOptions &&
    bonusCampaignOptions.length &&
    form.push({
      id: 2,
      name: "bonusCampaignId",
      options: bonusCampaignOptions,
      componentType: FIELD_TYPES.DROP_DOWN,
      className: "single",
      fieldProps: {
        label: "BonusCampaignDropdownLabel",
        autoComplete: "false",
        className: "single",
        material: true
      },

      validation: {
        validate: {
          required: value =>
            !!value || "BonusCampaignDropdownValidationRequired"
        }
      }
    });

  return form;
};

export const getPlayerCreditEnergyFormFields = ({
  activeTournamentsOptions = [],
  onSelecteActiveTournament
}) => {
  const form = [
    {
      id: 1,
      name: "selectedTournament",
      options: activeTournamentsOptions.map(t => ({
        id: t.tournamentId,
        title: t.title
      })),
      componentType: FIELD_TYPES.DROP_DOWN,
      className: "single",
      fieldProps: {
        label: "PlayerEnergySelectTournamentLabel",
        autoComplete: "false",
        className: "single",
        material: true,
        onChange: onSelecteActiveTournament
      },

      validation: {
        validate: {
          required: value =>
            !!value || "PlayerEnergySelectTournamentValidationRequired"
        }
      }
    },

    {
      id: 2,
      name: "freeMatchesAmount",
      componentType: FIELD_TYPES.TEXT_BOX,
      fieldProps: {
        label: "EnergyCreditLabel",
        type: "number",
        autoComplete: "freeMatchesAmount",
        material: true,
        className: "energy_Amount"
      },

      validation: {
        validate: {
          required: value => !!value || "AmountValidationRequired"
        }
      }
    }
  ];

  return form;
};
