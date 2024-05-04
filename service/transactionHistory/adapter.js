import moment from "moment";
export const TRANSACTION_STATUS = {
  0: "ALL",
  1: "PENDING",
  2: "COMPLETE",
  3: "CANCELLED",
  4: "REJECTED"
};
export const TRANSACTION_TYPE = {
  0: "ALL",
  1: "DEPOSIT",
  2: "WITHDRAWAL",
  3: "BET",
  4: "WIN",
  5: "REFUND",
  6: "CREDIT",
  7: "BONUS",
  8: "INACTIVE ACCOUNT FEE",
  9: "STORE PURCHASE(-)",
  10: "MANUAL PURGE(-)",
  11: "PREMIUM CHARGE(-)",
  12: "FINE(-)",
  13: "TOURNAMENT PRIZE(+)",
  14: "GAME ERROR CREDIT(+)",
  15: "PROMOTION(+)",
  16: "REFERRAL(+)"
};

export const toTransactionData = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toTransactionHistoryArray(data)
    };
  } else {
    return null;
  }
};

export const toTransactionHistoryArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toTransactionHistory(item);
    });
  } else {
    return [];
  }
};

export const toAccountBalance = data => {
  if (data) {
    return data;
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

const toTransactionHistory = data => {
  if (data) {
    return {
      id: data.id,
      type: TRANSACTION_TYPE[data.type],
      datetime: moment(data.dateCreated).format("DD-MM-YYYY HH:mm"),
      transactionId: data.id,
      balance: data.balance,
      amount: data.amount,
      status: TRANSACTION_STATUS[data.state]
    };
  }
};

export const toGetTransactionHistoryJson = data => {
  if (data) {
    return {
      id: data.id
    };
  }
};
