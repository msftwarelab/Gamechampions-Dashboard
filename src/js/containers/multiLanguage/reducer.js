import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  SET_LANGUAGES,
  LANGUAGES_ERROR,
  LANGUAGES_LOADING,
  SET_LANGUAGE,
  CURRENT_LANGUAGE
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  languages: [],
  selectedLanguage: CURRENT_LANGUAGE,
  isLoading: false,
  isError: false
});

export const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGES_LOADING:
      return state.set("isLoading", action.data);
    case LANGUAGES_ERROR:
      return state.set("isError", action.data);
    case SET_LANGUAGE:
      return state.set("selectedLanguage", fromJS(action.data));
    case SET_LANGUAGES:
      return state.set("languages", fromJS(action.data));
    default:
      return state;
  }
};

export const getLanguagesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectLanguages = state =>
  getLanguagesState(state).get("languages");
export const selectIsLoading = state =>
  getLanguagesState(state).get("isLoading");
export const selectSelectedLanguage = state =>
  getLanguagesState(state).get("selectedLanguage");

reducerRegistry.register(REDUCER_NAME, friendsReducer);
