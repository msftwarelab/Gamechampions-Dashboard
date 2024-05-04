import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "matchesAdmin";
export const MATCHES_LOADING = `${REDUCER_NAME}/MATCHES_LOADING`;
export const MATCHES_ERROR = `${REDUCER_NAME}/MATCHES_ERROR`;
export const SET_MATCHES = `${REDUCER_NAME}/SET_MATCHES`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const UPDATE_MATCH = `${REDUCER_NAME}/UPDATE_MATCH`;
export const PAGE_SIZE_VALUE = 10;
export const RETURN_URL = "/admin-matches";
export const DEFAULT_ACTION = "view";
export const CREATE_ACTION = "create";
export const DEBOUNCE_TIME = 500;

export const getMatchesFormFields = ({
  onSelectChange,
  matchStatusList,
  onFilterChange,
  onSearchChange
}) => [
  {
    id: 1,
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
      onChange: onSelectChange,
      className: "single"
    }
  },
  {
    id: 2,
    name: "search",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      placeholder: "SearchMatchById",
      material: true,
      className: "single",
      onChange: onSearchChange
    }
  },
  {
    id: 3,
    name: "filterByMatchesMade",
    componentType: FIELD_TYPES.CHECK_BOX,
    fieldProps: {
      label: "FilterByMatchesMade",
      autoComplete: "filterByMatchesMade",
      className: "single",
      material: true,
      onClick: onFilterChange
    }
  }
];

export const getMatchMakingOptions = ({
  hideBetAmount,
  gamesOptions,
  onSelectGameChange,
  gameRulesOptions,
  onSelectGameRuleChange
}) => [
  {
    id: 1,
    name: "games",
    options: gamesOptions,
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "false",
      material: true,
      className: "single",
      onChange: onSelectGameChange
    }
  },
  {
    id: 2,
    name: "gameRulesFormat",
    options: gameRulesOptions,
    componentType: FIELD_TYPES.DROP_DOWN,
    className: "single",
    fieldProps: {
      autoComplete: "false",
      className: "single",
      material: true,
      onChange: onSelectGameRuleChange
    }
  },
  {
    id: 3,
    name: "challengerId",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ChallengerIdLabel",
      type: "number",
      autoComplete: "challengerId",
      material: true
    },
    validation: {
      required: "ChallengerIDRequired"
    }
  },
  {
    id: 4,
    name: "defenderId",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      inputPattern: "[0-9]*",
      inputMode: "numeric",
      label: "DefenderIdLabel",
      type: "number",
      autoComplete: "defenderId",
      material: true
    },
    validation: {
      required: "DefenderIDRequired"
    }
  },
  {
    id: 5,
    name: "prize",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      min: 1,
      max: 500,
      inputPattern: "[0-9]*",
      inputMode: "numeric",
      label: "MatchMakingCardPrizeLabel",
      type: "number",
      autoComplete: "prize",
      className: hideBetAmount ? "bet-amount-hide" : "single bet-amount",
      material: true
    },
    validation: {
      required: !hideBetAmount && "BetAmountValidationRequired",
      min: {
        value: !hideBetAmount ? 1 : 0,
        message: "BetAmountValidationMin"
      },
      max: {
        value: 2400,
        message: "BetAmountValidationMax"
      }
    }
  },
  {
    id: 6,
    name: "matchIsFree",
    componentType: FIELD_TYPES.CHECK_BOX,
    fieldProps: {
      label: "IsFree",
      autoComplete: "matchIsFree",
      className: "single",
      material: true
    }
  }
];
