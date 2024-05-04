export const toGameAndRulesArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toGameAndRules(item);
    });
  } else {
    return [];
  }
};

export const toGameAndRules = data => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      gameRules: toRulesArray(data.rules),
      platform: data.platform,
      gameType: data.gameType
    };
  }
};

export const toRulesArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toRules(item);
    });
  } else {
    return [];
  }
};

export const toRules = data => {
  if (data) {
    return {
      id: data.id,
      title: data.ruleFormat,
      ruleDescription: data.ruleContent,
      isChampionsMode: data.isChampionsMode,
      isTournamentMode: data.isTournamentMode,
      summary: data.summary,
      thumbnail: data.thumbnail
    };
  }
};

export const toSendChallengeJson = data => {
  if (data) {
    return {
      gameId: data.gameId,
      rule: data.rule,
      format: data.ruleFormat,
      summary: data.summary,
      isInstant: data.isInstant,
      thumbnailUrl: data.thumbnailUrl,
      prize: data.prize,
      matchType: data.matchType,
      isChampionsMode: data.isChampionsMode,
      isTournamentMode: data.isTournamentMode,
      tournamentId: data.tournamentId,
      challengerId: data.challengerId
    };
  }
};

export const toSendPlayerChallengeJson = data => {
  if (data) {
    return {
      defenderId: data.id,
      gameId: data.gameId,
      rule: data.rule,
      format: data.ruleFormat,
      matchType: data.matchType,
      prize: data.prize,
      isChampionsMode: data.isChampionsMode,
      isTournamentMode: data.isTournamentMode
    };
  }
};
