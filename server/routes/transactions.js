// server/routes/transactions.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.get('/', auth.authenticate, transactionController.getTransactions);
router.post('/', auth.authenticate, transactionController.createTransaction);
router.delete('/:id', auth.authenticate, transactionController.deleteTransaction);

module.exports = router;