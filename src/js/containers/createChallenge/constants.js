import Prize from "~components/custom/formLabel/prize";
import GameRuleDescription from "~components/custom/formLabel/gameRuleDescription";
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "createChallenge";
export const GAMES_LOADING = `${REDUCER_NAME}/GAMES_LOADING`;
export const GAMES_ERROR = `${REDUCER_NAME}/GAMES_ERROR`;
export const GAMES_RESET_ERROR = `${REDUCER_NAME}/GAMES_RESET_ERROR`;
export const GAMES_AND_RULES = `${REDUCER_NAME}/GAMES_AND_RULES`;
export const SET_TOURNAMENT = `${REDUCER_NAME}/SET_TOURNAMENT`;
export const RESET_TOURNAMENT = `${REDUCER_NAME}/RESET_TOURNAMENT`;
export const RETURN_URL = "/";
export const TOURNAMENT_QUERY_STRING_PARAM = "tournament";
export const MINIMUM_BETAMOUNT_FOR_TOURNAMENT_POINTS = 5;
export const MINIMUN_BETAMOUNT = 1;
export const MAXIMUM_BETAMOUNT = 2400;
export const MATCHTYPE = { INCOGNITO: 0, RIVAL: 1 };

export const AVAILABLE_PRIZES = [5, 10, 20, 30, 50, 80, 100, 200];

const AVAILABLE_PRIZES_DROPDOWN_OPTIONS = currency =>
  AVAILABLE_PRIZES.map(prize => ({ id: prize, title: `${currency}${prize}` }));

export const getFormFields = ({
  gamesOptions,
  gameRulesOptions,
  onSelectGameChange,
  onSelectGameRuleChange,
  onPrizeChange,
  onMatchTypeChange,
  activeRule,
  selectedEntryFee,
  selectedPrize,
  currency,
  hideEntryFee,
  points,
  isDirectChallenge
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
    name: "prize",
    componentType: FIELD_TYPES.DROP_DOWN,
    options: AVAILABLE_PRIZES_DROPDOWN_OPTIONS(currency),
    fieldProps: {
      label: "MatchMakingCardPrizeLabel",
      className: hideEntryFee ? "bet-amount-hide" : "single bet-amount",
      material: true,
      onChange: onPrizeChange
    },
    validation: {
      required: !hideEntryFee && "PrizeValidationRequired",
      min: {
        value: !hideEntryFee ? AVAILABLE_PRIZES[0] : 0,
        message: "PrizeValidationMin"
      },
      max: {
        value: MAXIMUM_BETAMOUNT,
        message: "PrizetValidationMax"
      }
    }
  },
  {
    id: 4,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: Prize,
    selectedEntryFee,
    selectedPrize,
    currency,
    hideEntryFee,
    points,
    onMatchTypeChange,
    isDirectChallenge,
    className: "bet-amount"
  },
  {
    id: 5,
    componentType: FIELD_TYPES.CUSTOM_FIELD,
    child: GameRuleDescription,
    activeRule,
    className: "single"
  }
];
