import { STORAGE_URL } from "~service/constants";
import { toPagination } from "~service/adapter";

export const toFriends = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toFriendArray(data)
    };
  } else {
    return null;
  }
};
export const toFriendArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toFriend(item);
    });
  } else {
    return [];
  }
};

export const toFriend = data => {
  if (data) {
    return {
      id: data.id,
      userName: data.username,
      email: data.email,
      iconUrl: data.thumbnailUrl
        ? `${STORAGE_URL}${data.thumbnailUrl}`
        : "/img/icons/ic_account_circle-24px.svg",
      isSelected: false,
      hasUnreadMessages: data.hasUnreadMessages,
      isOnline: data.isOnline
    };
  }
};

export const toGetReferrerIdJson = data => {
  if (data) {
    return {
      id: data.userId
    };
  }
};

export const toGetReferrerId = data => {
  if (data) {
    return {
      referrerId: data.referrerId
    };
  }
};

export const toSendInviteJson = data => {
  if (data) {
    return {
      email: data.email,
      id: data.userId
    };
  }
};
