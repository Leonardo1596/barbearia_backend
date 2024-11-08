const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const TransactionController = require('../controllers/TransactionController');

// router.post('/create_transaction', verifyToken, TransactionController.createTransaction);
router.delete('/delete_transaction/:id', verifyToken, TransactionController.deleteTransaction);
router.get('/transactions/:userId', verifyToken, TransactionController.getTransactions);

module.exports = router;