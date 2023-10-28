class BankAccount {
    Owner;
    Balance;
    Currency;
    IBAN;
    Name;
    transactionHistory = [];

    constructor(owner, initialBalance = 0, currency = 'USD', iban = undefined, name = undefined) {
        this.Owner = owner;
        this.Balance = initialBalance;
        this.Currency = currency;
        this.IBAN = iban || `${this.Currency.substring(0, 2)}_${Math.random() * 11}`;
        this.Name = name || `${this.IBAN.substring(0, 10)}`;
    }

    getBalance() {
        return this.Balance;
    }

    createTransaction(amount) {
        let transaction = new Transaction(this, amount);
        this.transactionHistory.push(transaction);

        return transaction.Approved;
    }
}

class Transaction {
    Amount;
    TransactionNumber;
    Approved = false;

    constructor(bankAccount, amount) {
        this.Amount = amount;
        this.TransactionNumber = `${bankAccount.IBAN}-${Math.random() * 5}`;

        if((bankAccount.getBalance() + this.Amount) > 0) {
            bankAccount.Balance += amount;
            this.Approved = true;
        }
    }
}

module.exports = BankAccount, Transaction;