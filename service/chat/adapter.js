import moment from "moment";
import { STORAGE_URL } from "~service/constants";

export const toChatMessagesJson = data => {
  return {
    userId: data.userId,
    friendId: data.friendId
  };
};
export const toMessageJson = data => {
  return {
    message: data.messageText,
    senderId: data.userId,
    receiverId: data.friendId,
    isRead: false
  };
};

export const toMessage = (data, userId) => {
  return {
    id: data.id,
    messageText: data.message,
    isFromSender: data.senderId == userId,
    userId: data.senderId == userId ? data.receiverId : data.senderId,
    date: moment(data.dateCreated).format("DD-MM-YYYY HH:mm"),
    isSelected: false,
    isRead: data.isRead,
    senderId: data.senderId
  };
};

export const toMessageArray = (data, { userId }) => {
  if (data && data.length) {
    return data.map(item => toMessage(item, userId));
  }
  return [];
};

export const toPersonalMessages = data => {
  const formattedData = Object.keys(data).map(key => {
    const parsedKey = JSON.parse(key);
    const imageUrl = parsedKey.ThumbnailUrl
      ? `${STORAGE_URL}${parsedKey.ThumbnailUrl}`
      : "/img/icons/ic_account_circle-24px.svg";
    return {
      id: parsedKey.Id,
      userName: parsedKey.Username,
      imageUrl,
      lastMessage: data[key].message,
      newMessages: !data[key].isRead ? 1 : 0
    };
  });
  return formattedData;
};

export const toNumOfUnreadMessages = personalMessages =>
  personalMessages.reduce((prevVal, val) => {
    if (val?.newMessages) return prevVal + val.newMessages;
    else return prevVal;
  }, 0);
