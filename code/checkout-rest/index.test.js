// All this requires is that mocha is installed globally in your system, using `npm install mocha -g`

var Checkout = require('./checkout');
var assert = require('assert');

describe('Checkout', function () {
	var checkout;

	beforeEach(function () {
		checkout = new Checkout();
	});

	describe('#createTransaction', function () {
		it('should create a new, unpaid transaction with the first ID', function () {
			var transaction = checkout.createTransaction({
				product: 'Noodles',
				price: 10
			});

			assert.equal(transaction.id, 1);
			assert.equal(transaction.product, 'Noodles');
			assert.equal(transaction.price, 10);
			assert.equal(transaction.paid, false);
		});

		it('should create a new transaction with the second ID if one has already been created', function () {
			checkout.createTransaction({
				product: 'Noodles',
				price: 10
			});

			var transaction = checkout.createTransaction({
				product: 'Pie',
				price: 15
			});

			assert.equal(transaction.id, 2);
			assert.equal(transaction.product, 'Pie');
			assert.equal(transaction.price, 15);
			assert.equal(transaction.paid, false);
		});
	});

	describe('#getTransactionById', function () {
		it('should retrieve the transaction with the ID specified', function () {
			checkout.createTransaction({
				product: 'Eggs',
				price: 30
			});

			var transaction = checkout.getTransactionById(1);

			assert.equal(transaction.id, 1);
			assert.equal(transaction.price, 30);
			assert.equal(transaction.product, 'Eggs');
			assert.equal(transaction.paid, false);
		});

		it('should retrieve no transactions if there are none with the specified ID', function () {
			checkout.createTransaction({
				product: 'Eggs',
				price: 30
			});

			var transaction = checkout.getTransactionById(2);

			assert.equal(transaction, undefined);
		});
	});

	describe('#payTransaction', function () {
		it('should update the "paid" property of the spcified transaction and return the change due', function () {
			checkout.createTransaction({
				product: 'Butter',
				price: 9
			});

			var updatedTransaction = checkout.payTransaction(1, {
				amount: 12
			});

			assert.equal(updatedTransaction.id, 1);
			assert.equal(updatedTransaction.product, 'Butter');
			assert.equal(updatedTransaction.price, 9);
			assert.equal(updatedTransaction.paid, true);
			assert.equal(updatedTransaction.changeDue, 3);

			var transaction = checkout.getTransactionById(1);

			assert.equal(updatedTransaction.id, 1);
			assert.equal(updatedTransaction.product, 'Butter');
			assert.equal(updatedTransaction.price, 9);
			assert.equal(updatedTransaction.paid, true);
			assert.equal(updatedTransaction.changeDue, 3);
		});

		it('should throw an exception if the amount paid is insufficient', function () {
			checkout.createTransaction({
				product: 'Cheese',
				price: 20
			});

			assert.throws(function () {
				checkout.payTransaction(1, {
					amount: 15
				});
			});

			var transaction = checkout.getTransactionById(1);

			assert.equal(transaction.id, 1);
			assert.equal(transaction.product, 'Cheese');
			assert.equal(transaction.price, 20);
			assert.equal(transaction.paid, false);
			assert.equal(transaction.changeDue, undefined);
		});
	});
});