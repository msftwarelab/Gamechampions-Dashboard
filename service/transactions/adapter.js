export const toCreditJson = data => {
  if (data) {
    return {
      playerId: data.playerId,
      amount: data.amount,
      state: data.state,
      type: data.type,
      subtype: data.subtype
    };
  }
};

export const toEnergyPackage = data => {
  if (data) {
    return {
      playerId: data.playerId,
      tournamentId: data.tournamentId,
      energyPackage: {
        numberOfMatches: data.energyPackage.numberOfMatches,
        fee: data.energyPackage.fee
      }
    };
  }
};

export const toCreditEnergyJSON = data => {
  if (data) {
    return {
      playerId: data.playerId,
      tournamentId: data.tournamentId,
      freeMatchesAmount: data.freeMatchesAmount
    };
  }
};
