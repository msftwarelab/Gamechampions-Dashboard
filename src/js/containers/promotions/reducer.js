import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  PROMOTIONS_LOADING,
  PROMOTIONS_ERROR,
  SET_PAGINATION,
  SET_PROMOTIONS,
  SET_SELECTED_PROMOTION,
  RESET_SELECTED_PROMOTION,
  UPDATE_PROMOTION,
  ADD_PROMOTION
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  promotions: [],
  selectedPromotion: null,
  isLoading: false,
  isError: false,
  pagination: { page: 1 }
});

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROMOTIONS_LOADING:
      return state.set("isLoading", action.data);
    case PROMOTIONS_ERROR:
      return state.set("isError", action.data);
    case SET_PROMOTIONS:
      return state.set("promotions", fromJS(action.data));
    case UPDATE_PROMOTION:
      return state.set(
        "promotions",
        state
          .get("promotions")
          .map(item =>
            action.data.id === item.get("id") ? fromJS(action.data) : item
          )
      );
    case ADD_PROMOTION:
      return state.set(
        "promotions",
        state.get("promotions").push(fromJS(action.data))
      );
    case SET_SELECTED_PROMOTION:
      return state.set("selectedPromotion", fromJS(action.data));
    case RESET_SELECTED_PROMOTION:
      return state.set(
        "selectedPromotion",
        initialState.get("selectedPromotion")
      );
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    default:
      return state;
  }
};

export const getPromotionsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectPromotions = state =>
  getPromotionsState(state).get("promotions");
export const selectIsLoading = state =>
  getPromotionsState(state).get("isLoading");
export const selectPagination = state =>
  getPromotionsState(state).get("pagination");
export const selectSelectedPromotion = state =>
  getPromotionsState(state).get("selectedPromotion");

reducerRegistry.register(REDUCER_NAME, gamesReducer);
