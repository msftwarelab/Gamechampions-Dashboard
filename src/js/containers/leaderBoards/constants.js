export const REDUCER_NAME = "leaderBoards";
export const LEADER_BOARDS_LOADING = `${REDUCER_NAME}/LEADER_BOARDS_LOADING`;
export const LEADER_BOARDS_ERROR = `${REDUCER_NAME}/LEADER_BOARDS_ERROR`;
export const SET_LEADER_BOARDS = `${REDUCER_NAME}/SET_LEADER_BOARDS`;
export const SET_GAME_ID = `${REDUCER_NAME}/SET_GAME_ID`;
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";

export const FORM_FIELDS = [
  {
    id: 1,
    name: "rank",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Rank",
      autoComplete: "rank",
      material: true
    }
  },
  {
    id: 2,
    name: "name",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Name",
      autoComplete: "name",
      material: true
    }
  },
  {
    id: 3,
    name: "matches",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Matches",
      autoComplete: "matches",
      material: true
    }
  },
  {
    id: 4,
    name: "wins",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Wins",
      autoComplete: "wins",
      material: true
    }
  },
  {
    id: 5,
    name: "draws",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Draws",
      autoComplete: "draws",
      material: true
    }
  },
  {
    id: 6,
    name: "losses",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Losses",
      autoComplete: "losses",
      material: true
    }
  },
  {
    id: 7,
    name: "stars",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "stars",
      autoComplete: "stars",
      material: true
    }
  },
  {
    id: 8,
    name: "earnings",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      type: "text",
      label: "Earnings",
      autoComplete: "earnings",
      material: true
    }
  }
];
