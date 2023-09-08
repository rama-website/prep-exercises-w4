import eurosFormatter from './euroFormatter.js';

function createWallet(name, cash = 0) {
  let dailyAllowance = 40;
  let dayTotalWithdrawals = 0;

  return {
    _name: name,
    _cash: cash,

    deposit: function (amount) {
      this._cash += amount;
    },

    withdraw: function (amount) {
      if (this._cash - amount < 0) {
        console.log(`Insufficient funds!`);
        return 0;
      }

      if (dayTotalWithdrawals + amount > dailyAllowance) {
        console.log(`Insufficient remaining daily allowance!`);
        return 0;
      }

      this._cash -= amount;
      dayTotalWithdrawals += amount;
      return amount;
    },

    transferInto: function (wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${
          this._name
        } to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      wallet.deposit(withdrawnAmount);
    },

    reportBalance: function () {
      console.log(
        `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
      );
    },

    getName: function () {
      return this._name;
    },

    // New method to reset the daily allowance
    resetDailyAllowance: function () {
      dayTotalWithdrawals = 0;
    },

    // New method to set the daily allowance
    setDailyAllowance: function (newAllowance) {
      dailyAllowance = newAllowance;
      console.log(`Daily allowance set to: ${eurosFormatter.format(newAllowance)}`);
    },
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJack.setDailyAllowance(80); // Example of setting a new daily allowance
  walletJack.transferInto(walletJoe, 50);

  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();
