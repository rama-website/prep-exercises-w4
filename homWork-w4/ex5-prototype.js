import eurosFormatter from './euroFormatter.js';

function Wallet(name, cash) {
  this._name = name;
  this._cash = cash;
  this.dailyAllowance = 40; // Default maximum daily allowance
  this.dayTotalWithdrawals = 0; // Initialize daily withdrawals to zero
}

Wallet.prototype.deposit = function (amount) {
  this._cash += amount;
};

Wallet.prototype.withdraw = function (amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  // Check if the daily withdrawal limit will be exceeded
  if (this.dayTotalWithdrawals + amount > this.dailyAllowance) {
    console.log(`Daily withdrawal limit exceeded!`);
    return 0;
  }

  // Update the daily total withdrawals
  this.dayTotalWithdrawals += amount;

  this._cash -= amount;
  return amount;
};

Wallet.prototype.transferInto = function (wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
};

Wallet.prototype.reportBalance = function () {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
};

Wallet.prototype.getName = function () {
  return this._name;
};

Wallet.prototype.setDailyAllowance = function (newAllowance) {
  this.dailyAllowance = newAllowance;
  console.log(`Daily allowance set to: ${eurosFormatter.format(newAllowance)}`);
};

Wallet.prototype.resetDailyAllowance = function () {
  this.dayTotalWithdrawals = 0;
  console.log(`Daily allowance reset to zero.`);
};

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();

  walletJack.setDailyAllowance(80); // Example of setting a new daily allowance
  walletJack.resetDailyAllowance(); // Example of resetting daily allowance
}

main();
