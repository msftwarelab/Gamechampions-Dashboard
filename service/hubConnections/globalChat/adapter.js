import moment from "moment";
import { STORAGE_URL } from "~service/constants";

export const toMessageArray = (data, { userId }) => {
  if (data && data.length) {
    return data.map(item => toMessage(item, { userId }));
  }
  return [];
};

export const toMessageJson = data => {
  return {
    message: data.messageText,
    playerId: data.userId,
    isFromSender: true,
    isTranslatable: data.isTranslatable,
    isLink: data.isLink,
    gameType: data.gameType,
    gameId: data.gameId,
    isTournamentMode: data.isTournamentMode,
    prize: data.prize,
    betAmount: data.betAmount
  };
};

export const toMessage = (data, { userId }) => {
  if (data) {
    return {
      id: data.id,
      messageText: data.message,
      isFromSender: data.playerId == userId,
      player: toPlayer(data.player),
      date: moment(data.dateCreated).format("DD-MM-YYYY HH:mm"),
      isSelected: false,
      senderId: data.playerId,
      type: data.type,
      isTranslatable: data.isTranslatable,
      jsonParams: data.jsonParams && JSON.parse(data.jsonParams)
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
