import { fromJS } from "immutable";

import { REPORT_RESULT_ERROR, REDUCER_NAME } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  error: null
});

export const reportResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_RESULT_ERROR:
      return state.set("error", action.data);
    default:
      return state;
  }
};

export const getreportResultState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectError = state => getreportResultState(state).get("error");

reducerRegistry.register(REDUCER_NAME, reportResultReducer);
