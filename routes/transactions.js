const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');

router.post('/create_transaction', TransactionController.createTransaction);

module.exports = router;