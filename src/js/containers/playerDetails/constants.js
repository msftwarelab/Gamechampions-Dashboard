export const REDUCER_NAME = "playerDetails";
export const MATCHES_LOADING = `${REDUCER_NAME}/MATCHES_LOADING`;
export const MATCHES_ERROR = `${REDUCER_NAME}/MATCHES_ERROR`;
export const SET_PLAYER_MATCHES = `${REDUCER_NAME}/SET_PLAYER_MATCHES`;
export const SET_GAMER_TAGS = `${REDUCER_NAME}/SET_GAMER_TAGS`;
export const SET_XPPPOINTS = `${REDUCER_NAME}/SET_XPPOINTS`;
export const SET_PLAYERSTATS = `${REDUCER_NAME}/SET_PLAYERSTATS`;
export const PUSH_NOTIFICATION_QUERY_PARAM_NAME = "pushNotification";
export const PUSH_NOTIFICATION_QUERY_PARAM_VALUE = "message";

import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const FORM_FIELDS = [
  {
    id: 1,
    name: "opponent",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Opponent",
      autoComplete: "opponent",
      material: true
    }
  },
  {
    id: 2,
    name: "prize",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Prize",
      autoComplete: "prize",
      material: true
    }
  },
  {
    id: 3,
    name: "time",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Time",
      autoComplete: "time",
      material: true
    }
  },
  {
    id: 4,
    name: "result",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Result",
      autoComplete: "result",
      material: true
    }
  }
];
