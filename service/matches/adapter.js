import { List } from "immutable";
import moment from "moment";
import { PLATFORM, GAMETYPES } from "~containers/matchLobby/constants";
import { toPagination, toResponsiveImage } from "~service/adapter";
import { xpToStars } from "~service/players/adapter";
import { MatchState, STORAGE_URL, UMBRACO_API_URL } from "../constants";

export const toMatches = (data, { userId, games }) => {
  return data ? toSportsMatches(data, { userId, games }) : [];
};

export const toSportsMatches = (data, { userId, games }) => {
  if (data && userId && games) {
    data.sort(
      (a, b) => moment(b.startTime).valueOf() - moment(a.startTime).valueOf()
    );
    return toSportsMatchArray(data, userId, games);
  } else {
    return {};
  }
};

export const toSportsMatchArray = (data, userId, games) => {
  if (data && data.length) {
    return data
      .map(item => {
        return toSportsMatch(item, userId, games);
      })
      .filter(x => !!x);
  } else {
    return [];
  }
};

export const toSportsMatch = (data, userId, games) => {
  let game = games.find(g => g.id == data.gameId);
  if (data && game) {
    return {
      id: data.id,
      guid: data.guid,
      title: game.title,
      prize: data.prize,
      summary: data.summary,
      startTime: data.startTime,
      state: MatchState[data.state],
      isWon:
        (userId == data.challengerId &&
          data.challengerScore > data.defenderScore) ||
        (userId == data.defenderId && data.challengerScore < data.defenderScore)
          ? true
          : false,
      challengerId: data.challengerId,
      opponent:
        userId == data.challengerId
          ? toPlayer(data.defender)
          : toPlayer(data.challenger),
      message: `MatchMessageState${data.state}`,
      format: data.rule,
      thumbnail: toResponsiveImage([
        {
          title: game.title,
          imageUrl: game.thumbnailUrl,
          alternateText: game.title,
          width: 182,
          height: 164
        }
      ])
    };
  }
};

export const toPlayer = data => {
  if (data) {
    return {
      id: data.id,
      userName: data.username,
      xpPoints: data.xpPoints,
      stars: xpToStars(data.xpPoints)
    };
  }
};

export const toMatchJson = data => {
  if (data) {
    return {
      matchId: data.matchId,
      userId: data.userId, // TODO: just for testing, remove
      games: data.games
    };
  }
};

export const toMatchStatus = (data, { userId }) => {
  if (data) {
    return {
      status: data.state,
      isChallenger: userId == data.challengerId,
      dateUpdated: data.dateUpdated
    };
  }
};

export const toMatchLobby = (data, { games, userId }) => {
  if (data && games) {
    let game = games.find(g => g.id == data.gameId);
    return {
      id: data.id,
      gameId: data.gameId,
      gameTitle: game.title,
      platform: game.platform,
      platformLogoUrl: `${STORAGE_URL}images/${game.platform}-G_logo.png`.toLowerCase(),
      bannerImageUrl: game.bannerImageUrl,
      format: data.rule,
      challenger: toMatchLobbyPlayer(data.challenger, data.gameType),
      challengee: toMatchLobbyPlayer(data.defender, data.gameType),
      score: toScore(data),
      scoreAdvantage: toScoreAdvantage(data),
      suggestedScoreAdvantage: toSuggestedScoreAdvantage(data),
      betAmount: data.betAmount,
      defenderPointPotentials: data.defenderPointPotentials,
      challengerPointPotentials: data.challengerPointPotentials,
      autoValidationCountdownInMinutes: data.autoValidationCountdownInMinutes,
      maxRivalMatchCountdownInMinutes: data.maxRivalMatchCountdownInMinutes,
      challengerId: data.challengerId,
      defenderId: data.defenderId,
      lastUpdatedDate: data.lastUpdatedDate,
      prize: data.prize,
      guid: data.guid,
      matchType: data.matchType,
      hosterId: data.hosterId,
      isInstant: data.isInstant,
      isChampionsMode: data.isChampionsMode,
      challengerTeam: toMatchTeam(data.challengerTeam),
      defenderTeam: toMatchTeam(data.defenderTeam),
      startTime: data.startTime,
      reportMatchResultCountdon: data.reportMatchResultCountdon,
      status: data.state,
      isChallenger: userId == data.challengerId,
      dateUpdated: data.dateUpdated
    };
  } else {
    return {
      id: data.id,
      gameId: data.gameId,
      format: data.rule,
      platform: data.platform,
      challenger: toMatchLobbyPlayer(data.challenger, data.gameType),
      challengee: toMatchLobbyPlayer(data.defender, data.gameType),
      score: toScore(data),
      scoreAdvantage: toScoreAdvantage(data),
      suggestedScoreAdvantage: toSuggestedScoreAdvantage(data),
      betAmount: data.betAmount,
      guid: data.guid,
      hosterId: data.hosterId,
      prize: data.prize,
      isChampionsMode: data.isChampionsMode,
      challengerTeam: toMatchTeam(data.challengerTeam),
      defenderTeam: toMatchTeam(data.defenderTeam),
      status: data.state,
      isChallenger: userId == data.challengerId,
      dateUpdated: data.dateUpdated
    };
  }
};

export const toMatchLobbyPlayer = (data, gameType) => {
  if (data) {
    return {
      id: data.id,
      userName: data.username,
      platformId: getGamerTag(data, gameType).value,
      thumbnailUrl: data.thumbnailUrl
        ? `${STORAGE_URL}${data.thumbnailUrl}`
        : "/img/icons/ic_account_circle-24px.svg",
      xpPoints: data.xpPoints ? data.xpPoints : "0", // TODO remove later
      stars: xpToStars(data.xpPoints)
    };
  }
};
export const getGamerTag = (data, gameType) => {
  switch (gameType) {
    case GAMETYPES.FIFA:
      return { value: data.eaAccount, id: "eaAccount" };
    case GAMETYPES.MADDEN:
      return { value: data.eaAccount, id: "eaAccount" };
    case GAMETYPES.NBA:
      return { value: data.nba2KAccount, id: "nba2KAccount" };
    case GAMETYPES.WARZONE:
      return { value: data.activisionId, id: "activisionId" };
    case GAMETYPES.FORTNITE:
      return { value: data.fortniteGamertag, id: "fortniteGamertag" };
    default:
      return { value: null, id: null };
  }
};

export const toScore = ({ challengerScore, defenderScore }) => {
  if (challengerScore || defenderScore) {
    return {
      challenger: parseInt(challengerScore),
      challengee: parseInt(defenderScore)
    };
  } else {
    return {
      challenger: 0,
      challengee: 0
    };
  }
};
export const toSuggestedScoreAdvantage = ({
  challengerRecommendedScoreAdvantage,
  defenderRecommendedScoreAdvantage
}) => {
  if (
    challengerRecommendedScoreAdvantage ||
    defenderRecommendedScoreAdvantage
  ) {
    return {
      challenger: parseInt(challengerRecommendedScoreAdvantage),
      challengee: parseInt(defenderRecommendedScoreAdvantage)
    };
  } else {
    return {
      challenger: "0",
      challengee: "0"
    };
  }
};
export const toScoreAdvantage = ({
  challengerScoreAdvantage,
  defenderScoreAdvantage
}) => {
  if (challengerScoreAdvantage || defenderScoreAdvantage) {
    return {
      challenger: parseInt(challengerScoreAdvantage),
      challengee: parseInt(defenderScoreAdvantage)
    };
  } else {
    return {
      challenger: "0",
      challengee: "0"
    };
  }
};

export const toSetScoreAdvantageJson = data => {
  if (data) {
    return {
      challengerScoreAdvantage: data.challengerScoreAdvantage,
      defenderScoreAdvantage: data.challengeeScoreAdvantage,
      matchId: data.matchId
    };
  }
};

export const toSetResultJson = data => {
  if (data) {
    return {
      challengerFinalScore: data.challengerFinalScore,
      defenderFinalScore: data.challengeeFinalScore,
      matchId: data.matchId,
      userId: data.userId
    };
  }
};

export const toSetAdminResultJson = data => {
  if (data) {
    return {
      challengerFinalScore: data.challengerFinalScore,
      defenderFinalScore: data.challengeeFinalScore,
      matchId: data.matchId
    };
  }
};

export const toStartMatchJson = data => {
  if (data) {
    return {
      matchId: data.matchId,
      userId: data.userId
    };
  }
};
export const toChallengeJson = data => {
  if (data) {
    return {
      matchId: data.matchId,
      userId: data.userId
    };
  }
};

export const toAdminCancelJson = data => {
  if (data) {
    return {
      matchId: data
    };
  }
};

export const toMatchStatusJson = data => {
  if (data) {
    return {
      matchId: data.matchId,
      action: data.action,
      userId: data.userId, // TODO: just for testing, remove later
      fileUrl: data.fileUrl
    };
  }
};

export const toMatchStartTimeJson = data => {
  if (data) {
    return {
      matchId: data.matchId
    };
  }
};

export const toMatchStartTime = data => {
  if (data) {
    return {
      id: data.id,
      startTime: data.startTime
    };
  }
};

export const toMatchTeam = data => {
  if (data) {
    return {
      matchId: data.matchId,
      title: data.title,
      code: data.code,
      rating: data.rating,
      colour: data.colour,
      thumbnailUrl: `${UMBRACO_API_URL}${data.thumbnailUrl}`
    };
  }
};

export const toAdminMatches = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toAdminMatchesArray(data)
    };
  } else {
    return null;
  }
};

export const toAdminMatchesArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toAdminMatch(item);
    });
  } else {
    return [];
  }
};

export const toAdminMatch = data => {
  if (data) {
    let obj = {
      id: data.id,
      challengerName: data.challenger ? data.challenger.username : "",
      defenderName: data.defender ? data.defender.username : "",
      prize: data.prize,
      challengerId: data.challengerId,
      state: MatchState[data.state],
      dateUpdated: data.dateUpdated,
      finalScoreChallenger: data.challengerScore,
      finalScoreDefender: data.defenderScore
    };

    if (data.gameTitle) {
      obj.gameTitle = data.gameTitle;
    }
    return obj;
  }
};

export const toCreateAdminMatchJson = data => {
  if (data) {
    let obj = {
      challengerId: data.challengerId,
      defenderId: data.defenderId,
      gameId: data.games,
      isFree: data.matchIsFree,
      prize: data.prize,
      rule: data.rule,
      summary: data.summary,
      thumbnailUrl: data.thumbnailUrl,
      format: data.ruleFormat,
      isChampionsMode: data.isChampionsMode,
      isTournamentMode: data.isTournamentMode
    };

    return obj;
  }
};

export const toEntryFeeJson = data => {
  if (data) {
    return {
      prize: data.prize
    };
  }
};

export const toListOfOngoingMatches = matches => {
  if (!matches) return null;
  const pending = matches?.filter(
    match => match.get("state") === MatchState[1]
  );
  const lobby = matches?.filter(match => match.get("state") === MatchState[3]);
  const live = matches?.filter(match => match.get("state") === MatchState[2]);
  const inputScore = matches?.filter(
    match =>
      match.get("state") === MatchState[6] ||
      match.get("state") === MatchState[7]
  );
  const ongoing = List().concat(live, pending, inputScore, lobby);
  return ongoing;
};
