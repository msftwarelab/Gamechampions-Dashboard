import { fromJS } from "immutable";
import reducerRegistry from "../../util/reducerRegistry";
import {
  REDUCER_NAME,
  SET_PAGE,
  SUPPORT_ERROR,
  SUPPORT_LOADING
} from "./constants";

const initialState = fromJS({
  isLoading: false,
  isError: false,
  page: null
});

export const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUPPORT_LOADING:
      return state.set("isLoading", action.data);
    case SUPPORT_ERROR:
      return state.set("isError", action.data);
    case SET_PAGE:
      return state.set("page", fromJS(action.data));
    default:
      return state;
  }
};

export const getSupportState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectIsLoading = state => getSupportState(state).get("isLoading");
export const selectPageContent = state => getSupportState(state).get("page");

reducerRegistry.register(REDUCER_NAME, supportReducer);
