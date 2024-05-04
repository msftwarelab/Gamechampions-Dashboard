import moment from "moment";
import { STORAGE_URL } from "~service/constants";

export const toMessageJson = data => {
  return {
    message: data.messageText,
    gameId: data.gameId,
    userId: data.userId,
    isFromSender: true
  };
};

export const toMessageArray = (data, { userId }) => {
  if (data && data.length) {
    return data.map(item => toMessage(item, { userId }));
  }
  return [];
};

export const toMessage = (data, { userId }) => {
  if (data) {
    return {
      id: data.id,
      messageText: data.message,
      isFromSender: data.player.id == userId,
      player: toPlayer(data.player),
      date: moment(data.dateCreated).format("DD-MM-YYYY HH:mm"),
      isSelected: false
    };
  }
};

export const toPlayer = data => {
  if (data) {
    return {
      id: data.id,
      userName: data.username,
      thumbnailUrl: data.thumbnailUrl
        ? `${STORAGE_URL}${data.thumbnailUrl}`
        : "/img/icons/ic_account_circle-24px.svg"
    };
  }
};
