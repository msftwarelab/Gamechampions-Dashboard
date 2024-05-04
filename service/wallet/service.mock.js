export default class Service {
  constructor() {
    this.wallet = {
      accountBalance: 30,
      availableAmount: 20
    };
  }
  getWalletAmount() {
    return Promise.resolve(this.wallet);
  }

  executeTransaction() {
    return Promise.resolve();
  }

  createCardAndExecuteTransaction() {
    return Promise.resolve();
  }

  confirmTransaction() {
    return Promise.resolve();
  }

  submitWithdraw() {
    return Promise.resolve();
  }

  confirmPaypalTransaction() {
    return Promise.resolve();
  }

  confirmApcoPayTransaction() {
    return Promise.resolve();
  }
}
