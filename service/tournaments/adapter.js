import moment from "moment";
import { toPlayer } from "~service/players/adapter";

export const toPlayerTournamentRankingArray = data => {
  if (data && data.length) {
    return data.map(item => toPlyerTournamentRankingItem(item));
  }
  return [];
};

export const toPlyerTournamentRankingItem = data => {
  return {
    rank: data.rank,
    rankDifference: data.rankDifference,
    totalPoints: data.totalPoints,
    prize: data.prize,
    numberOfFreeMatchesPlayed: data.numberOfFreeMatchesPlayed,
    player: toPlayer(data.player),
    isSeparator: data.isSeparator,
    isTableRowSeparator: data.isSeparator
  };
};

export const toTournamentItem = data => {
  return {
    tournamentId: data.tournamentId,
    title: data.title,
    thumbnailUrl: data.thumbnailUrl,
    globalMultiplier: data.globalMultiplier,
    tournamentSteps: data.tournamentSteps,
    tournamentPageLink: data.tournamentPageLink,
    summary: data?.summary,
    prizes: data.prizes,
    win: data.win,
    draw: data.draw,
    loss: data.loss,
    energyPackages: data.energyPackages,
    cashGameMultiplier: data.cashGameMultiplier,
    numberOfFreeMatches: data.numberOfFreeMatches,
    numberOfFreeMatchesPlayed: data.numberOfFreeMatchesPlayed,
    dateFrom: moment(moment.utc(data.from).unix() * 1000).format("YYYY/MM/DD"),
    dateTo: moment.utc(data.to).unix() * 1000,
    isOngoing:
      moment().isAfter(moment.utc(data.from)) &&
      moment().isBefore(moment.utc(data.to)),
    totalPrize: data.totalPrize,
    availableFreeMatches: data.availableFreeMatches
  };
};

export const toTournamentItems = tournaments =>
  tournaments.map(tournament => toTournamentItem(tournament));

export const toActiveTournamentsArray = data => {
  if (data && data.length) {
    return data.map(item => toActiveTournamentItem(item));
  }
  return [];
};

export const toActiveTournamentItem = data => {
  return {
    tournamentId: data.tournamentId,
    title: data.title,
    availableFreeMatches: data.numberOfFreeMatchesPlayed
  };
};

export const toActiveTournamentJSON = data => {
  if (data) {
    return {
      playerId: data.playerId,
      language: data.language
    };
  }
};
