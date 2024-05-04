export default class Service {
  constructor() {
    this.transactionHistoryData = [
      {
        id: 1,
        balance: 20,
        status: "withdrawn",
        amount: 300,
        datetime: "1990-11-28T00:00:00",
        transactionId: "ABC153"
      },
      {
        id: 2,
        balance: 22,
        status: "pending",
        amount: 300,
        datetime: "1990-11-28T00:00:00",
        transactionId: "ABC16553"
      },
      {
        id: 3,
        balance: 20,
        status: "deposit",
        amount: 200,
        datetime: "1990-11-28T00:00:00",
        transactionId: "ABC1553"
      }
    ];
    this.accountBalance = 20;
  }
  getTransactionHistory() {
    return Promise.resolve({
      transactionHistory: this.transactionHistoryData,
      accountBalance: this.accountBalance
    });
  }
}
