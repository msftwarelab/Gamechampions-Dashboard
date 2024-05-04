import {
  FRIENDS_LOADING,
  FRIENDS_ERROR,
  SET_FRIENDS,
  SET_FRIEND,
  RESET_FRIEND,
  SET_PAGINATION,
  MARK_NEW_MESSAGES_AS_READ
} from "./constants";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: FRIENDS_LOADING,
  data
});

const isError = data => ({
  type: FRIENDS_ERROR,
  data
});

export const setFriends = data => ({
  type: SET_FRIENDS,
  data
});

export const setFriend = data => ({
  type: SET_FRIEND,
  data
});

export const resetFriend = () => ({
  type: RESET_FRIEND
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

export const markNewMessagesAsRead = data => ({
  type: MARK_NEW_MESSAGES_AS_READ,
  data
});

export const fetchFriends = data => dispatch => {
  const { page, pageSize } = data;
  dispatch(isLoading(true));
  return Api.friends
    .get({ page, pageSize })
    .then((response = {}) => {
      const friends = data.selectedFriendId
        ? response.data.map(item => {
            item.isSelected = data.selectedFriendId === item.id;
            return item;
          })
        : response.data;
      dispatch(setPagination(response.pagination));
      dispatch(setFriends(friends));
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
