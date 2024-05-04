import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "friends";
export const FRIENDS_LOADING = `${REDUCER_NAME}/FRIENDS_LOADING`;
export const FRIENDS_ERROR = `${REDUCER_NAME}/FRIENDS_ERROR`;
export const SET_FRIENDS = `${REDUCER_NAME}/SET_FRIENDS`;
export const RESET_FRIEND = `${REDUCER_NAME}/RESET_FRIEND`;
export const SET_FRIEND = `${REDUCER_NAME}/SET_FRIEND`;
export const FRIENDS_LOGO = "/img/icons/supervisor-account-24-px.svg";
export const SET_PAGINATION = `${REDUCER_NAME}/SET_PAGINATION`;
export const MARK_NEW_MESSAGES_AS_READ = `${REDUCER_NAME}/MARK_NEW_MESSAGES_AS_READ`;
export const DEBOUNCE_TIME = 500;
export const ONLINE_PLAYERS_PAGE_SIZE_VALUE = 20;

export const getFormFields = ({ onSearchChange }) => [
  {
    id: 1,
    name: "search",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      placeholder: "Search",
      material: true,
      className: "single",
      onChange: onSearchChange
    }
  }
];

export const INTERVAL_TIME = 120000;
