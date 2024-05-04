export const toWalletAmountJson = data => {
  if (data) {
    return {
      id: data.id
    };
  }
};

export const toWalletAmount = data => {
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

export const toDepositInfo = data => {
  if (data) {
    return {
      messageTagText: data.MessageTagText,
      paymentProvider: data.PaymentProvider,
      userId: data.PlayerId,
      amount: data.DepositAmount
    };
  }
};

export const toTransactionJson = data => {
  if (data) {
    return {
      amount: data.amount,
      returnUrl: data.returnUrl,
      promoCode: data.promoCode
    };
  }
};

export const toNewCardTransactionJson = data => {
  if (data) {
    return {
      amount: data.amount,
      token: data.token,
      returnUrl: data.returnUrl,
      promoCode: data.promoCode
    };
  }
};

export const toPayment = data => {
  if (data) {
    return {
      threeDsUrl: data.threeDsUrl,
      isSuccessfulPayment: data.isSuccessfulPayment,
      paymentReference: data.paymentReference
    };
  }
};
export const toCommission = data => {
  if (data) {
    return {
      commission: data.commission,
      minimunAmountCommission: data.minimunAmountCommission
    };
  }
};

export const toConfirmransactionJson = data => {
  if (data) {
    return {
      paymentReference: data.paymentReference
    };
  }
};
export const toConfirmPaypalTransactionJson = data => {
  if (data) {
    return {
      response: JSON.stringify(data),
      orderId: data.orderID,
      promoCode: data.promoCode
    };
  }
};

export const toPaymentUrlRequestJson = data => {
  if (data) {
    return {
      amount: data.amount,
      promoCode: data.promoCode,
      paymentProvider: data.providerTag
    };
  }
};

export const toPaymentUrl = data => {
  if (data) {
    return {
      transactionURL: data
    };
  }
};

export const toSendWithdrawalEmailJson = data => {
  if (data) {
    return {
      amount: data.amount,
      playerId: data.playerId,
      WithdrawalType: data.WithdrawalType
    };
  }
};

export const toWithdrawJSON = data => {
  if (data) {
    return {
      amount: data.amount,
      playerId: data.playerId,
      WithdrawalType: data.WithdrawalType
    };
  }
};
