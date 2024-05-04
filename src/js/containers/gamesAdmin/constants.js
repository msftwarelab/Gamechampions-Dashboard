import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "gamesAdmin";
export const GAMES_LOADING = `${REDUCER_NAME}/GAMES_LOADING`;
export const GAMES_ERROR = `${REDUCER_NAME}/GAMES_ERROR`;
export const SET_GAMES = `${REDUCER_NAME}/SET_GAMES`;
export const REMOVE_GAME = `${REDUCER_NAME}/REMOVE_GAME`;
export const ADD_GAME = `${REDUCER_NAME}/ADD_GAME`;
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const PAGE_SIZE_VALUE = 12;
export const RETURN_URL = "/admin-games";
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
