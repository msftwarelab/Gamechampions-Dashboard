import moment from "moment";
import { STORAGE_URL, BONUS_TRANSACTION_TYPE } from "~service/constants";
import { toUrl } from "../affiliates/adapter";

export const toPlayerProfile = data => {
  if (data) {
    return {
      id: data.id,
      facebookId: data.facebookIdHash,
      role: data.role,
      userName: data.username,
      fullName: data.fullName,
      email: data.email,
      contactNumber: data.contactNumber,
      dateOfBirth: data.dateOfBirth,
      documents: data.documents,
      country: data.country,
      currency: data.currency,
      city: data.city,
      address: data.streetAddress,
      nba2KAccount: data.nba2KAccount,
      activisionId: data.activisionId,
      fortniteGamertag: data.fortniteGamertag,
      postCode: data.postCode,
      hasPlayerMadeFirstDeposit: data.hasPlayerMadeFirstDeposit,
      defaultGameType: data.defaultGameType,
      profileImage: data.thumbnailUrl
        ? `${STORAGE_URL}${data.thumbnailUrl}`
        : "/img/icons/ic_account_circle-24px.svg",
      psnId: data.psnId,
      xboxLive: data.xboxLive,
      eaAccount: data.eaAccount,
      bankName: data.swiftBankName,
      iban: data.iban,
      payPalUserName: data.payPalUserName,
      swiftBic: data.swiftBic,
      accountNumber: data.swiftAccountNumber,
      bankAddress: data.swiftBankAddress,
      bankCountry: data.bankCountry
    };
  } else {
    return null;
  }
};

export const toAdminProfile = data => {
  if (data) {
    return {
      id: data.id,
      facebookId: data.facebookIdHash,
      role: data.role,
      email: data.email,
      contactNumber: data.contactNumber,
      userName: data.username,
      fullName: data.fullName,
      country: data.country
    };
  } else {
    return null;
  }
};

export const toCard = data => {
  if (data) {
    return {
      cardDisplayNumber: toCardNumber(data.cardDisplayNumber),
      cardHolderFullName: data.cardHolderFullName
    };
  }
};

const toCardNumber = data => {
  if (data && data.length > 4) {
    return data.substr(data.length - 4, 4);
  }
};

export const toBalance = data => {
  if (data) {
    return {
      bonusMoney: data.bonusBalance || "0",
      availableAmount: data.availableBalance || "0",
      depositCount: data.depositCount
    };
  } else {
    return {
      bonusMoney: "0",
      availableAmount: "0",
      depositCount: null
    };
  }
};

export const toPoll = data => {
  if (data) {
    return {
      balance: toBalance(data.balance),
      notification: data.notification
    };
  }
};

export const toBonusTransactionsData = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toBonusTransactions(data)
    };
  } else {
    return null;
  }
};

export const toBonusTransactions = data => {
  if (data) {
    return toBonusTransactionArray(data);
  } else {
    return null;
  }
};

export const toBonusTransactionArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toBonusTransaction(item);
    });
  } else {
    return [];
  }
};

export const toPagination = data => {
  if (data) {
    return {
      pageCount: parseInt(data.pageCount),
      itemCount: parseInt(data.itemCount)
    };
  }
};

export const toBonusTransaction = data => {
  if (data) {
    return {
      id: data.id,
      type: BONUS_TRANSACTION_TYPE[data.type],
      datetime: moment(data.dateCreated).format("DD-MM-YYYY HH:mm"),
      transactionId: data.id,
      amount: data.amount
    };
  }
};

export const toBonusTransactionJson = data => {
  if (data) {
    return {
      type: data.type,
      amount: data.amount,
      playerId: data.playerId,
      bonusCampaignId: data.bonusCampaignId
    };
  }
};

export const toReferralLink = data => {
  if (data) {
    return {
      link: toUrl(data.affiliateLink),
      totalCommissionAmount:
        data.totalCommissionAmount && data.totalCommissionAmount.toFixed(2),
      totalPayout: data.totalPayout && data.totalPayout.toFixed(2)
    };
  }
};

export const toPaymentProviders = data => {
  if (!data || !data.length) return null;
  return {
    providersList: data
  };
};

export const toInplayBalance = data => {
  if (data) {
    return data.inPlayBalance;
  }
};
