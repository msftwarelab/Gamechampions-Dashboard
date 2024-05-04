import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import moment from "moment";

export const REDUCER_NAME = "games";
export const GAMES_LOADING = `${REDUCER_NAME}/GAMES_LOADING`;
export const GAMES_ERROR = `${REDUCER_NAME}/GAMES_ERROR`;
export const SET_GAMES = `${REDUCER_NAME}/SET_GAMES`;
export const REMOVE_GAME = `${REDUCER_NAME}/REMOVE_GAME`;
export const ADD_GAME = `${REDUCER_NAME}/ADD_GAME`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const SET_ADMIN_FILTER_FROM = `${REDUCER_NAME}/SET_ADMIN_FILTER_FROM`;
export const SET_ADMIN_FILTER_TO = `${REDUCER_NAME}/SET_ADMIN_FILTER_TO`;
export const SET_INSTANT_MATCHES = `${REDUCER_NAME}/SET_INSTANT_MATCHES`;
export const SET_MESSAGES_SENT = `${REDUCER_NAME}/SET_MESSAGES_SENT`;
export const SET_PLAYER_DEPOSITS = `${REDUCER_NAME}/SET_PLAYER_DEPOSITS`;
export const SET_PLAYER_REGISTRATIONS = `${REDUCER_NAME}/SET_PLAYER_REGISTRATIONS`;
export const SET_MATCHES_PLAYED = `${REDUCER_NAME}/SET_MATCHES_PLAYED`;
export const SET_PLAYER_WINS = `${REDUCER_NAME}/SET_PLAYER_WINS`;
export const SET_DEPOSIT_SUM = `${REDUCER_NAME}/SET_DEPOSIT_SUM`;
export const SET_DEPOSIT_COUNT = `${REDUCER_NAME}/SET_DEPOSIT_COUNT`;
export const SET_REGISTERED_PLAYER_COUNT = `${REDUCER_NAME}/SET_REGISTERED_PLAYER_COUNT`;
export const SET_ACTIVE_PLAYERS = `${REDUCER_NAME}/SET_ACTIVE_PLAYERS`;
export const SET_MATCH_COMMISSIONS = `${REDUCER_NAME}/SET_MATCH_COMMISSIONS`;
export const SET_MATCH_PRIZES = `${REDUCER_NAME}/SET_MATCH_PRIZES`;
export const SET_TOURNAMENT = `${REDUCER_NAME}/SET_TOURNAMENT`;
export const SET_TOURNAMENT_POINTS_TABLE = `${REDUCER_NAME}/SET_TOURNAMENT_POINTS_TABLE`;
export const SET_ROTATING_BANNERS = `${REDUCER_NAME}/SET_ROTATING_BANNERS`;
export const PAGE_SIZE_VALUE = 12;
export const RETURN_URL = "/";
export const DEFAULT_ACTION = "view";
export const CREATE_ACTION = "create";
export const GAME_DETAILS_ERROR = `${REDUCER_NAME}/GAME_DETAILS_ERROR`;
export const DEBOUNCE_TIME = 500;

export const getFormFields = ({ onSearchChange }) => [
  {
    id: 1,
    name: "search",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      placeholder: "SearchGames",
      material: true,
      className: "single",
      onChange: onSearchChange
    }
  }
];
export const FORM_FIELDS = [
  {
    id: 1,
    name: "title",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "Title",
      type: "text",
      autoComplete: "title",
      material: true
    },
    validation: { required: "TitleValidationRequired" }
  },
  {
    id: 2,
    name: "platform",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "Platform",
      type: "text",
      autoComplete: "platform",
      material: true
    },
    validation: { required: "PlatformValidationRequired" }
  }
];

export const getAdminWidgetFormFields = ({ onRangeChange }) => [
  {
    id: 1,
    name: "from",
    componentType: FIELD_TYPES.SINGLE_DATE_PICKER,
    fieldProps: {
      label: "From",
      type: "text",
      autoComplete: "from",
      material: true,
      onChange: onRangeChange
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
      onChange: onRangeChange
    },
    validation: {
      watchValidate: watch => ({
        validate: value =>
          moment(value) > moment(watch("from")) ||
          "ConfirmPasswordValidationRequired"
      })
    }
  }
];
