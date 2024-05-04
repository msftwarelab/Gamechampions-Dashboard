import { fromJS } from "immutable";

import {
  SET_LOADING,
  SET_ERROR,
  REDUCER_NAME,
  SET_BONUSES,
  SET_PAGINATION,
  REMOVE_BONUS,
  ADD_BONUS,
  UPDATE_BONUS,
  SET_SELECTED_BONUS,
  SET_DIRECT_BONUSES
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  bonuses: [],
  isLoading: false,
  error: false,
  pagination: { page: 1 },
  selectedBonus: null,
  directBonuses: []
});

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return state.set("isLoading", action.data);
    case SET_ERROR:
      return state.set("error", action.data);
    case SET_BONUSES:
      return state.set("bonuses", fromJS(action.data));
    case SET_SELECTED_BONUS:
      return state.set("selectedBonus", fromJS(action.data));
    case REMOVE_BONUS:
      return state.set(
        "bonuses",
        state.get("bonuses").filter(n => n.get("id") !== action.data.id)
      );
    case ADD_BONUS:
      return state.set(
        "bonuses",
        state.get("bonuses").push(fromJS(action.data))
      );
    case UPDATE_BONUS:
      return state.update("bonuses", bonuses =>
        bonuses.map(bonus =>
          bonus.get("id") == action.data.id ? fromJS(action.data) : bonus
        )
      );
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    case SET_DIRECT_BONUSES:
      return state.set("directBonuses", fromJS(action.data));
    default:
      return state;
  }
};

export const getBonusesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectBonuses = state => getBonusesState(state).get("bonuses");
export const selectSelectedBonus = state =>
  getBonusesState(state).get("selectedBonus");
export const selectIsLoading = state => getBonusesState(state).get("isLoading");
export const selectPagination = state =>
  getBonusesState(state).get("pagination");
export const selectDirectBonuses = state =>
  getBonusesState(state).get("directBonuses");

reducerRegistry.register(REDUCER_NAME, gamesReducer);
