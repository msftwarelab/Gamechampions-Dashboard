import {
  SET_NOTIFICATIONS,
  SET_UNREAD_NOTIFICATIONS,
  NOTIFICATIONS_ERROR,
  NOTIFICATIONS_LOADING,
  SET_NEW_NOTIFICATION_ACTIVE,
  SET_NOTIFICATION_READ,
  REDUCER_NAME,
  SET_POPUP_NOTIFICATIONS,
  PAGE_SIZE,
  RESET_NEW_NOTIFICATION,
  PUSH_NEW_NOTIFICATION,
  REMOVE_OLD_NOTIFICATION
} from "./constants";
import Api from "../../../../service/main";
import { renderPage, getPage } from "~containers/page/actions";

const setNotifications = data => ({
  type: SET_NOTIFICATIONS,
  data
});

const setUnreadNotifications = data => ({
  type: SET_UNREAD_NOTIFICATIONS,
  data
});

const isLoading = data => ({
  type: NOTIFICATIONS_LOADING,
  data
});

const isError = data => ({
  type: NOTIFICATIONS_ERROR,
  data
});

export const setNewNotificationActive = data => ({
  type: SET_NEW_NOTIFICATION_ACTIVE,
  data
});

export const removeOldNotification = () => ({
  type: REMOVE_OLD_NOTIFICATION
});

export const resetNewNotification = () => ({
  type: RESET_NEW_NOTIFICATION
});

export const pushNewNotification = data => ({
  type: PUSH_NEW_NOTIFICATION,
  data
});

export const setNotificationAsRead = data => ({
  type: SET_NOTIFICATION_READ,
  data
});

export const setPopupNotifiactions = data => ({
  type: SET_POPUP_NOTIFICATIONS,
  data
});

export const updateNotificationAsRead = data => dispatch =>
  Api.notifications
    .update(data)
    .then(response => {
      dispatch(setNotificationAsRead(response));
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });

export const getNotificationsAsUnread = () => dispatch => {
  dispatch(isLoading(true));
  return Api.notifications
    .getUnread()
    .then(response => {
      dispatch(setUnreadNotifications(response));
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getNotifications = data => dispatch => {
  dispatch(isLoading(true));
  return Api.notifications
    .get(data)
    .then(response => {
      if (data && data.pageSize === PAGE_SIZE) {
        dispatch(setPopupNotifiactions(response));
      } else {
        dispatch(setNotifications(response));
      }
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getNewNotification = () => dispatch => {
  dispatch(isLoading(true));
  return Api.notifications
    .getNotification()
    .then(response => {
      if (response) {
        dispatch(pushNewNotification(response));
      }
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const fetchNotifications = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getNotifications(pageData)(dispatch)
  ]);
