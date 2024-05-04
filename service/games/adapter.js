import { STORAGE_URL, UMBRACO_API_URL } from "../constants";
import { toPagination, toResponsiveImage } from "~service/adapter";
import { xpToStars } from "~service/players/adapter";
import { toMatchLobbyPlayer } from "~service/matches/adapter";

export const toGameJson = data => {
  if (data) {
    return {
      gameId: data.gameId,
      language: data.language
    };
  }
};

export const toGames = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toGameArray(data)
    };
  } else {
    return null;
  }
};

export const toGameArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toGame(item);
    });
  } else {
    return [];
  }
};

export const toGame = data => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      platform: data.platform,
      gameType: data.gameType,
      thumbnailUrl: `${UMBRACO_API_URL}${data.thumbnailUrl}`,
      bannerImageUrl: `${UMBRACO_API_URL}${data.bannerImageUrl}`,
      summary: data.summary,
      rulesContent: data.rulesContent,
      rules: toGameRulesArray(data.rules),
      banners: toBannersArray(data.banners)
    };
  }
};

export const toBannersArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toBanner(item);
    });
  } else {
    return [];
  }
};

export const toBanner = data => {
  if (data) {
    return {
      images: toResponsiveImage(data.images),
      title: data.title,
      link: toBannerLink(data.link),
      summary: data.summary,
      textColor: data.textColor,
      ctaText: data.ctaText
    };
  }
};

export const toBannerLink = data => {
  if (data) {
    return {
      title: data.title,
      url: data.url,
      isNewWindow: data.isNewWindow,
      isInternal: data.isInternal
    };
  } else {
    return null;
  }
};

export const toRecentPlayers = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toRecentPlayersArray(data)
    };
  } else {
    return null;
  }
};

export const toRecentPlayersArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toRecentPlayer(item);
    });
  } else {
    return [];
  }
};

export const toRecentPlayer = data => {
  if (data) {
    return {
      id: data.id,
      userName: data.username,
      iconUrl: data.thumbnailUrl
        ? `${STORAGE_URL}${data.thumbnailUrl}`
        : "/img/icons/ic_account_circle-24px.svg",
      xpPoints: data.xpPoints,
      stars: xpToStars(data.xpPoints)
    };
  }
};

export const toGameCreated = data => {
  if (data) {
    return {
      title: data.title,
      platform: data.platform
    };
  }
};

export const toLeaderBoardItemArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toLeaderBoardItem(item);
    });
  } else {
    return [];
  }
};

export const toLeaderBoardItem = data => {
  if (data) {
    return {
      id: data.id,
      country: data.country,
      rank: data.rank,
      userName: data.username,
      matches: data.matches,
      wins: data.wins,
      draws: data.draws,
      losses: data.losses,
      xp: data.xp,
      stars: xpToStars(data.xp),
      earnings: data.earnings
    };
  }
};

export const toTickerMatchArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toTickerMatch(item);
    });
  } else {
    return [];
  }
};

const toTickerMatch = data => {
  if (data) {
    return {
      id: data.id,
      winner: data.winner,
      looser: data.looser,
      bet: data.prize,
      isTie: data.isTie
    };
  }
};

export const toInstantMatchArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toInstantMatch(item);
    });
  } else {
    return [];
  }
};

const toInstantMatch = data => {
  if (data) {
    return {
      id: data.id,
      prize: data.prize,
      betAmount: data.betAmount,
      format: data.rule,
      summary: data.summary,
      content: data.format,
      thumbnailUrl: data.thumbnailUrl,
      platform: data.platform,
      matchType: data.matchType,
      gameTitle: data.gameTitle,
      startedBy: data.challenger.fullName,
      challenger: toMatchLobbyPlayer(data.challenger, data.platform),
      state: data.state,
      isTournamentMode: data.isTournamentMode,
      maxRivalMatchCountdownInMinutes: data.maxRivalMatchCountdownInMinutes,
      defenderTeam: data.defenderTeam,
      defenderId: data.defenderId,
      defenderUsername: data.defenderUsername
    };
  }
};

export const toGameWithRules = data => {
  if (data) {
    return {
      title: data.title,
      rules: toGameRulesArray(data.rules)
    };
  }
};

const toGameRulesArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toGameRules(item);
    });
  } else {
    return [];
  }
};

const toGameRules = data => {
  if (data) {
    return {
      id: data.id,
      subtitle: data.ruleFormat,
      html: data.ruleContent
    };
  }
};
const toTournamentPointsTable = data => {
  if (data) {
    return {
      prize: data.prize,
      win: data.win,
      draw: data.draw,
      loss: data.loss
    };
  }
};

export const toTournamentPointsTableArray = data => {
  if (data && data.length) {
    return data.map(toTournamentPointsTable);
  }
  return [];
};

export const toSendGameJson = data => {
  if (data) {
    return {
      title: data.title,
      platform: data.platform
    };
  }
};

export const toSelectedTournamentPrizeRange = (pointsTable = [], prize = 0) => {
  const lastRange = pointsTable[pointsTable.length - 1];
  if (lastRange && prize >= lastRange.prize) {
    return lastRange;
  }

  for (let i = 1; i < pointsTable.length; i++) {
    const currentRange = pointsTable[i - 1];
    const nextRange = pointsTable[i];
    if (prize >= currentRange.prize && prize < nextRange.prize) {
      return currentRange;
    }
  }
  return { win: 0, loss: 0, draw: 0 };
};

export const toGoMaps = data => {
  if (data && data.length) {
    return data.map(item => {
      return toGoMap(item);
    });
  } else {
    return [];
  }
};

export const toGoMap = data => {
  if (data) {
    return {
      id: data.id,
      key: data.key,
      urlValue: data.urlValue
    };
  }
};
