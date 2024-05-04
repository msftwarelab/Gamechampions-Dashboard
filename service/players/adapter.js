import { toPagination } from "~service/adapter";
import { STORAGE_URL } from "~service/constants";
import { TransactionState, TransactionType } from "~service/constants";
import { MatchState } from "~service/constants";
import moment from "moment";
import { toBonusTransactions } from "~service/self/adapter";

export const toPlayers = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toPlayerArray(data)
    };
  } else {
    return null;
  }
};

export const toPlayerArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toPlayer(item);
    });
  } else {
    return [];
  }
};

export const toPlayer = data => {
  if (data) {
    return {
      id: data.id,
      email: data.email,
      contactNumber: data.contactNumber,
      fullName: data.fullName,
      userName: data.username,
      address: data.streetAddress,
      city: data.city,
      postCode: data.postCode,
      country: data.country,
      dateOfBirth: data.dateOfBirth,
      profileImage: data.thumbnailUrl
        ? `${STORAGE_URL}${data.thumbnailUrl}`
        : "/img/icons/ic_account_circle-24px.svg",
      facebookId: data.facebookIdHash,
      linkedId: data.linkedInIdHash,
      acceptedTaC: data.acceptedTaC,
      platformId: data.platformId,
      xpPoints: data.xpPoints,
      stars: xpToStars(data.xpPoints),
      status: data.status,
      psnId: data.psnId,
      xboxLive: data.xboxLive,
      eaAccount: data.eaAccount,
      fortniteGamertag: data.fortniteGamertag,
      activisionId: data.activisionId,
      nba2KAccount: data.nba2KAccount,
      winRate: data.winRate,
      numberOfMatches: data.numberOfMatches,
      numberOfTransactions: data.numberOfTransactions,
      bankName: data.swiftBankName,
      iban: data.iban,
      payPalUserName: data.payPalUserName,
      swiftBic: data.swiftBic,
      accountNumber: data.swiftAccountNumber,
      bankAddress: data.swiftBankAddress,
      bankCountry: data.bankCountry,
      acceptedMarketingConsent: data.acceptedMarketingConsent,
      role: data.role,
      group: data.group,
      registrationIpAddress: data.registrationIpAddress,
      loginIpAddress: data.loginIpAddress,
      isBlocked: data.isBlocked,
      isMuted: data.isMuted,
      barringEndDate: moment(data.barringEndDate).format("DD/MM/YYYY"),
      documents: data.documents
    };
  }
};

export const toPlayerBalance = data => {
  if (data) {
    return {
      bonusMoney: data.bonusBalance || "0",
      availableAmount: data.availableBalance || "0",
      depositCount: data.depositCount
    };
  } else {
    return {
      bonusMoney: "0",
      availableAmount: "0"
    };
  }
};

export const toPlayerBonusTransactions = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toBonusTransactions(data)
    };
  } else {
    return null;
  }
};
export const toPlayerTransactions = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toPlayerTransactionsArray(data)
    };
  } else {
    return null;
  }
};

export const toPlayerTransactionsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toPlayerTransaction(item);
    });
  } else {
    return [];
  }
};

export const toPlayerTransaction = data => {
  if (data) {
    return {
      id: data.id,
      dateCreated: moment(data.dateCreated).format("DD-MM-YYYY HH:mm"),
      amount: data.amount,
      state: TransactionState[data.state],
      type: TransactionType[data.type],
      promoCode: data.promoCode
    };
  }
};

export const toPlayerMatches = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toPlayerMatchesArray(data)
    };
  } else {
    return null;
  }
};

export const toPlayerMatchesArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toPlayerMatch(item);
    });
  } else {
    return [];
  }
};

export const toPlayerMatch = data => {
  if (data) {
    return {
      id: data.id,
      gameId: data.gameId,
      challengerName: data.challenger ? data.challenger.username : "",
      defenderName: data.defender ? data.defender.username : "",
      prize: data.prize,
      challengerId: data.challengerId,
      state: MatchState[data.state],
      finalScoreChallenger: data.challengerScore,
      finalScoreDefender: data.defenderScore
    };
  }
};

export const toPlayerXPPoints = data => {
  return {
    xpPoints: data ? data : "0",
    stars: xpToStars(data)
  };
};
export const toPlayerBlock = data => {
  return {
    playerId: data.playerId,
    endDate: data.barringEndDate,
    type: data.barringType
  };
};
export const toUpdateAdminPlayerJson = data => {
  return {
    id: data.id,
    xboxLive: data.xboxLive,
    psnId: data.psnId,
    eaAccount: data.eaAccount,
    fortniteGamertag: data.fortniteGamertag,
    group: data.group,
    fullname: data.fName,
    address: data.userAddress,
    city: data.userCity,
    country: data.userCountry,
    userName: data.userName,
    activisionId: data.activisionId,
    nba2KAccount: data.nba2KAccount,
    bankName: data.bankName,
    dateOfBirth: data.dateOfBirth,
    bankCountry: data.bankCountry,
    bankAddress: data.bankAddress,
    accountNumber: data.accountNumber,
    contactNumber: data.contactNumber,
    iban: data.iban,
    payPalUserName: data.payPalUserName,
    swiftBic: data.swiftBic,
    documents: data.documents
  };
};

export const toUpdatePlayerXpPointsJson = data => {
  return {
    playerId: data.playerId,
    gameType: data.gameType,
    xpPoints: data.xpPoints
  };
};

export const xpToStars = data => {
  let xpPoints = parseInt(data);

  if (xpPoints < 100) return 1;
  if (xpPoints >= 100 && xpPoints < 200) return 2;
  if (xpPoints >= 200 && xpPoints < 300) return 3;
  if (xpPoints >= 300 && xpPoints < 400) return 4;
  if (xpPoints >= 400) return 5;
};

export const toDuplicatePlayers = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toDuplicateIpPlayerArray(data)
    };
  } else {
    return null;
  }
};

export const toDuplicateDetailPlayers = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toDuplicateIpPlayerDetailArray(data)
    };
  } else {
    return null;
  }
};

export const toDuplicateIpPlayerArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toDuplicatePlayer(item);
    });
  } else {
    return [];
  }
};

export const toDuplicateIpPlayerDetailArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toDuplicatePlayerDetail(item);
    });
  } else {
    return [];
  }
};

export const toDuplicatePlayer = data => {
  return {
    ipAddress: data.ipAddress,
    numberOfPlayers: data.numberOfPlayers,
    emails: data.playerAccounts.reduce((acc, curr) => {
      return [
        ...acc,
        {
          value: curr.email,
          isBlocked: curr.isBlocked
        }
      ];
    }, []),
    userNames: data.playerAccounts.reduce((acc, curr) => {
      return [
        ...acc,
        {
          value: curr.username,
          isBlocked: curr.isBlocked
        }
      ];
    }, []),
    isBlocked: data.playerAccounts.reduce((acc, curr) => {
      return [...acc, curr.isBlocked];
    }, [])
  };
};

export const toDuplicatePlayerDetail = data => {
  return {
    userName: data.username,
    email: data.email,
    dateOfBirth: data.dateOfBirth,
    country: data.country,
    id: data.id
  };
};

export const toUploadPlayerDocumentsArray = data => {
  if (data && data.length) {
    return data.map(item => toPlayerDocument(item));
  } else {
    return [];
  }
};

export const toPlayerDocument = data => {
  return {
    fileUrl: data.fileUrl,
    fileName: data.fileName,
    id: data.id
  };
};

export const toUploadPlayerDocumentsArrayJSON = data => {
  return {
    id: data.id,
    files: data.files
  };
};

export const toPlayerDeletedDocument = data => {
  return {
    fileUrl: data.fileUrl,
    fileName: data.fileName,
    playerId: data.playerId,
    id: data.id
  };
};

export const toPlayerBonusCampaignStatus = data => {
  return {
    playerBonusCampaignId: data.playerBonusCampaignId,
    bonusCampaignTitle: data.bonusCampaignTitle,
    currentBonusBets: data.currentBonusBets,
    targetBonusBets: data.targetBonusBets,
    bonusAmount: data.bonusAmount
  };
};

export const toPlayerLinkedBonusCampaignsArray = data => {
  if (data && data.length) {
    return data.map(item => toPlayerLinkedBonusCampaign(item));
  } else {
    return [];
  }
};

export const toPlayerLinkedBonusCampaign = data => {
  return {
    playerBonusCampaignId: data.playerBonusCampaignId,
    bonusCampaignTitle: data.bonusCampaignTitle,
    currentBonusBets: data.currentBonusBets,
    targetBonusBets: data.targetBonusBets,
    bonusAmount: data.bonusAmount,
    expiryDate: data.expiryDate,
    status: data.status
  };
};
