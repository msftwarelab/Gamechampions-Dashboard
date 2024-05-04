import { fromJS } from "immutable";
import { matchPath } from "react-router-dom";
import { getRouteWithoutLanguage } from "../../util/util";

import { SET_NAV_ITEM_ACTIVE, SET_NAVIGATION, REDUCER_NAME } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  nav: {
    name: "",
    url: "",
    icon: "",
    isActive: false,
    children: []
  }
});

export function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAV_ITEM_ACTIVE:
      if (getRouteWithoutLanguage(action.data.href) === "/arena") {
        // home page
        return state
          .setIn(["nav", "isActive"], true)
          .updateIn(["nav", "children"], n =>
            n.map(m => m.set("isActive", false))
          );
      }
      return state
        .setIn(["nav", "isActive"], false)
        .updateIn(["nav", "children"], n =>
          n.map(m => {
            return m.set(
              "isActive",
              !!matchPath(action.data.href, {
                path: m.get("url"),
                exact: true
              })
            );
          })
        );
    case SET_NAVIGATION:
      return state.set("nav", fromJS(action.data));
    default:
      return state;
  }
}

export const getNavigationState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectNavIsActive = state =>
  getNavigationState(state).getIn(["nav", "isActive"]);
export const selectNavName = state =>
  getNavigationState(state).getIn(["nav", "name"]);
export const selectNavUrl = state =>
  getNavigationState(state).getIn(["nav", "url"]);
export const selectNavIcon = state =>
  getNavigationState(state).getIn(["nav", "icon"]);
export const selectNavChildren = state =>
  getNavigationState(state).getIn(["nav", "children"]);

reducerRegistry.register(REDUCER_NAME, navigationReducer);
