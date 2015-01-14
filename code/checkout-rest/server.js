#! /usr/bin/env node

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Checkout = require('./Checkout');
var checkout = new Checkout();

app.use(bodyParser.json());

app.post('/transactions', function (req, res) {
	var transaction = checkout.createTransaction(req.body);
	res.send({
		product: transaction.product,
		price: transaction.price,
		id: transaction.id,
		paid: transaction.paid,
		changeDue: transaction.changeDue || 0,
		links: {
			self: {
				href: '/transactions/' + transaction.id
			}
		}
	});
});

app.get('/transactions/:id', function (req, res) {
	var transaction = checkout.getTransactionById(req.params.id);
	res.send({
		product: transaction.product,
		price: transaction.price,
		id: transaction.id,
		paid: transaction.paid,
		changeDue: transaction.changeDue || 0,
		links: {
			self: {
				href: '/transactions/' + transaction.id
			}
		}
	});
});

app.post('/transactions/:id/payment', function (req, res) {
	var transaction;
	if (!req.body.amount) {
		res.status(400);
		return res.send({
			message: 'No amount was specified for payment'
		});
	}

	try {
		transaction = checkout.payTransaction(req.params.id, {
			amount: req.body.amount
		});
	} catch(e) {
		res.status(400);
		return res.send({
			message: e.message
		});
	}

	res.send({
		product: transaction.product,
		price: transaction.price,
		id: transaction.id,
		paid: transaction.paid,
		changeDue: transaction.changeDue || 0,
		links: {
			self: {
				href: '/transactions/' + transaction.id
			}
		}
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Checkout application listening at http://%s:%s', host, port);
});