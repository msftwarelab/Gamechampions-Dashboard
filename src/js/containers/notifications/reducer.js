import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  SET_NOTIFICATIONS,
  NOTIFICATIONS_ERROR,
  NOTIFICATIONS_LOADING,
  SET_NOTIFICATION_READ,
  SET_UNREAD_NOTIFICATIONS,
  SET_POPUP_NOTIFICATIONS,
  SET_NEW_NOTIFICATION_ACTIVE,
  RESET_NEW_NOTIFICATION,
  PUSH_NEW_NOTIFICATION,
  REMOVE_OLD_NOTIFICATION
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  notifications: [],
  unreadNotifications: [],
  notificationPopup: [],
  newNotificationArray: [],
  newNotificationActive: null,
  isLoading: false,
  isError: false
});

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return state.set("isLoading", action.data);
    case NOTIFICATIONS_ERROR:
      return state.set("isError", action.data);
    case SET_NOTIFICATIONS:
      return state.set("notifications", fromJS(action.data));
    case SET_NEW_NOTIFICATION_ACTIVE:
      return state.set("newNotificationActive", fromJS(action.data));
    case SET_NOTIFICATION_READ:
      var index = state
        .get("notifications")
        .findIndex(n => n.get("id") === action.data.id);
      return state.set(
        "notifications",
        state.get("notifications").update(index, () => {
          return fromJS(action.data);
        })
      );
    case SET_UNREAD_NOTIFICATIONS:
      return state.set("unreadNotifications", fromJS(action.data));
    case RESET_NEW_NOTIFICATION:
      return state.set(
        "newNotificationActive",
        initialState.get("newNotificationActive")
      );
    case SET_POPUP_NOTIFICATIONS:
      return state.set("popupNotifications", fromJS(action.data));
    case PUSH_NEW_NOTIFICATION:
      return state.updateIn(["newNotificationArray"], arr =>
        action.data ? arr.push(fromJS(action.data)) : arr
      );
    case REMOVE_OLD_NOTIFICATION:
      return state.updateIn(["newNotificationArray"], arr =>
        arr.slice(1, arr.size)
      );

    default:
      return state;
  }
};

export const getNotificationsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
export const selectNotifications = state =>
  getNotificationsState(state).get("notifications");
export const selectNewNotificationActive = state =>
  getNotificationsState(state).get("newNotificationActive");
export const selectNewNotificationArray = state =>
  getNotificationsState(state).get("newNotificationArray");
export const selectPopupNotifications = state =>
  getNotificationsState(state).get("popupNotifications");
export const selectUnreadNotifications = state =>
  getNotificationsState(state).get("unreadNotifications");
export const selectIsLoading = state =>
  getNotificationsState(state).get("isLoading");

reducerRegistry.register(REDUCER_NAME, notificationsReducer);
