function Checkout() {
	var currentID = 1;

	var transactions = {};

	this.createTransaction = function (transaction) {
		transaction.id = currentID;
		transaction.paid = false;
		transactions[currentID] = transaction;

		currentID += 1;

		return transaction;
	};

	this.getTransactionById = function (id) {
		var transaction = transactions[id];
		return transaction;
	};

	this.payTransaction = function (id, options) {
		var transactionToPay = this.getTransactionById(id);

		if (options.amount < transactionToPay.price) {
			throw new Error('The amount provided to pay was insufficient');
		}

		transactionToPay.changeDue = options.amount - transactionToPay.price;
		transactionToPay.paid = true;


		return transactionToPay;
	};
}

module.exports = Checkout;