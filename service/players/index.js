import MockService from "./service.mock";
import {
  toPlayers,
  toPlayerBalance,
  toPlayer,
  toPlayerTransactions,
  toPlayerTransaction,
  toPlayerMatches,
  toPlayerXPPoints,
  toPlayerBlock,
  toUpdateAdminPlayerJson,
  toPlayerBonusTransactions,
  toUpdatePlayerXpPointsJson,
  toDuplicatePlayers,
  toDuplicateDetailPlayers,
  toUploadPlayerDocumentsArray,
  toUploadPlayerDocumentsArrayJSON,
  toPlayerDeletedDocument,
  toPlayerBonusCampaignStatus,
  toPlayerLinkedBonusCampaignsArray
} from "./adapter";

export default class Profile {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get(data).then(response => toPlayers(response));
  }

  getBalanceById(data) {
    return this.service
      .getBalanceById(data)
      .then(response => toPlayerBalance(response));
  }

  getById(data) {
    return this.service.getById(data).then(response => toPlayer(response));
  }

  getPlayerTransactions(data) {
    return this.service
      .getPlayerTransactions(data)
      .then(response => toPlayerTransactions(response));
  }
  getPlayerBonusTransactions(data) {
    return this.service
      .getPlayerBonusTransactions(data)
      .then(response => toPlayerBonusTransactions(response));
  }

  getPlayerMatches(data) {
    return this.service
      .getPlayerMatches(data)
      .then(response => toPlayerMatches(response));
  }
  getXPPoints(data) {
    return this.service
      .getPlayerXPPoints(data)
      .then(response => toPlayerXPPoints(response));
  }

  getPlayerStats(data) {
    return this.service.getPlayerStats(data).then(response => response);
  }

  updateXPPoints(data) {
    return this.service
      .updatePlayerXPPoints(toUpdatePlayerXpPointsJson(data))
      .then(response => toPlayerXPPoints(response));
  }

  completeTransaction(data) {
    return this.service
      .completeTransaction(data)
      .then(response => toPlayerTransaction(response));
  }
  blockPlayer(data) {
    return this.service
      .blockPlayer(toPlayerBlock(data))
      .then(response => toPlayer(response));
  }
  unblockPlayer(data) {
    return this.service
      .unblockPlayer(data)
      .then(response => toPlayer(response));
  }
  mutePlayer(data) {
    return this.service
      .mutePlayer(toPlayerBlock(data))
      .then(response => toPlayer(response));
  }
  unMutePlayer(data) {
    return this.service
      .unMutePlayer(toPlayerBlock(data))
      .then(response => toPlayer(response));
  }
  search(data) {
    return this.service.search(data).then(response => toPlayers(response));
  }
  updateAdminPlayer(data) {
    return this.service
      .updateAdminPlayer({ data: toUpdateAdminPlayerJson(data) })
      .then(response => toPlayer(response));
  }

  getDuplicatePlayers(data) {
    return this.service.getDuplicatePlayers(data).then(response => {
      return toDuplicatePlayers(response);
    });
  }

  getDuplicatePlayersDetail(data) {
    return this.service.getDuplicatePlayersDetail(data).then(response => {
      return toDuplicateDetailPlayers(response);
    });
  }

  uploadPlayerDocuments(data) {
    return this.service
      .uploadPlayerDocuments({ data: toUploadPlayerDocumentsArrayJSON(data) })
      .then(response => {
        return toUploadPlayerDocumentsArray(response);
      });
  }

  deletePlayerDocument(data) {
    return this.service
      .deletePlayerDocument(data)
      .then(response => toPlayerDeletedDocument(response));
  }

  validatePlayerDocument(data) {
    return this.service.validatePlayerDocument(data).then(response => response);
  }

  getPlayerBonusCampaignStatus(data) {
    return this.service
      .getPlayerBonusCampaignStatus(data)
      .then(response => toPlayerBonusCampaignStatus(response));
  }

  getPlayerLinkedBonusCampaigns(data) {
    return this.service
      .getPlayerLinkedBonusCampaigns(data)
      .then(response => toPlayerLinkedBonusCampaignsArray(response));
  }
  assignDefaultGame(data) {
    return this.service.assignDefaultGame(data).then(response => response);
  }
  assignDefaultGameUsername(data) {
    return this.service
      .assignDefaultGameUsername(data)
      .then(response => response);
  }
  claimWelcomeBonus(data) {
    return this.service.claimWelcomeBonus(data).then(response => response);
  }
}
