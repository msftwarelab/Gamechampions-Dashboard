import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const REDUCER_NAME = "messages";
export const SET_MESSAGES = `${REDUCER_NAME}/SET_MESSAGES`;
export const RESET_MESSAGES = `${REDUCER_NAME}/RESET_MESSAGES`;
export const ADD_MESSAGE = `${REDUCER_NAME}/ADD_MESSAGE`;
export const SET_IS_NEW_MESSAGE = `${REDUCER_NAME}/SET_IS_NEW_MESSAGE`;
export const CHAT_LOADING = `${REDUCER_NAME}/CHAT_LOADING`;
export const SET_IS_NEW_MESSAGE_CONDITIONALLY = `${REDUCER_NAME}/SET_IS_NEW_MESSAGE_CONDITIONALLY`;
export const SET_PERSONAL_MESSAGES = `${REDUCER_NAME}/SET_PERSONAL_MESSAGES`;
export const MARK_PERSONAL_MESSAGE_AS_READ = `${REDUCER_NAME}/MARK_PERSONAL_MESSAGE_AS_READ`;
export const SET_CHAT_POPUP_DATA = `${REDUCER_NAME}/SET_CHAT_POPUP_DATA`;
export const SET_IS_CHAT_POPUP_OPEN = `${REDUCER_NAME}/SET_IS_CHAT_POPUP_OPEN`;
export const INTERVAL_TIME = 5000;
export const FORM_FIELDS = [
  {
    id: 1,
    name: "messageText",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      autoComplete: "off",
      placeholder: "ChatBoxPlaceHolder",
      maxLength: "140",
      material: true,
      autoFocus: false,
      className: "message-box__text-input"
    }
  }
];
