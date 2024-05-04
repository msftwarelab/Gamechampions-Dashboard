import { toResponsiveImage } from "~service/adapter";
const PSN = "/img/icons/games/playstation_logo.svg";
const XBOX = "/img/icons/games/xbox_logo.svg";
const EAACCOUNT = "/img/icons/games/ea_logo.svg"; // Logo?
import moment from "moment";
import { STORAGE_URL } from "~service/constants";
import { xpToStars } from "~service/players/adapter";
export const toGetPlayerDetailsJson = data => {
  if (data) {
    return {
      id: data.playerId,
      gameId: data.gameId
    };
  }
};

export const toGetPlayerMatches = (data, { id }) => {
  if (data) {
    return {
      matches: toMatchArray(data, id)
    };
  }
};

const toMatchArray = (data, id) => {
  if (data && data.length) {
    return data.map(item => {
      return toMatch(item, id);
    });
  } else {
    return [];
  }
};

const toMatch = (data, id) => {
  if (data) {
    return {
      id: data.id,
      opponent:
        data.challengerId == id
          ? data?.defender?.username
          : data?.challenger?.username,
      rule: data.rule,
      prize: data.prize,
      time: moment(data.dateUpdated).format("DD-MM-YY HH:mm"),
      result:
        data.challengerId == id
          ? data.challengerScore == data.defenderScore
            ? "draw"
            : data.challengerScore > data.defenderScore
            ? "win"
            : "loss"
          : data.challengerScore == data.defenderScore
          ? "draw"
          : data.defenderScore > data.challengerScore
          ? "win"
          : "loss"
    };
  }
};

const toPlayerStatistics = data => {
  if (data) {
    return {
      numberOfMatches: data.numberOfMatches,
      winRate: data.winRate,
      xpPoints: data.xpPoints,
      stars: xpToStars(data.xpPoints)
    };
  }
};
// TODO: Add thumbnail, currentStatus and lastLogin in response
const toPlayerDetails = data => {
  if (data) {
    return {
      id: data.id,
      userName: data.username,
      thumbnail: toResponsiveImage([
        {
          title: "thumbnail.jpg",
          imageUrl: data.thumbnailUrl
            ? `${STORAGE_URL}${data.thumbnailUrl}`
            : "/img/icons/ic_account_circle-24px.svg",
          alternateText: "thumbnail.jpg",
          width: 150,
          height: 150
        }
      ]),
      currentStatus: "Offline",
      lastLogin: "3 months",
      xpPoints: data.xpPoints,
      stars: xpToStars(data.xpPoints)
    };
  }
};
export const toPlayer = data => {
  if (data) {
    return {
      tags: toGamerTagArray(data),
      details: toPlayerDetails(data),
      statistics: toPlayerStatistics(data)
    };
  }
};

export const toGamerTagArray = data => {
  if (data) {
    let tags = [];
    if (data.psnId)
      tags.push({ id: data.psnId, title: data.psnId, iconUrl: PSN });
    if (data.xboxLive)
      tags.push({ id: data.xboxLive, title: data.xboxLive, iconUrl: XBOX });
    if (data.eaAccount)
      tags.push({
        id: data.eaAccount,
        title: data.eaAccount,
        iconUrl: EAACCOUNT
      });
    return tags;
  } else {
    return [];
  }
};
