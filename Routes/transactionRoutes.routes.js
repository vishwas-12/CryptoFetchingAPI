const express = require('express');
const router = express.Router();
const transaction = require('../controllers/transactionController.js');

router.get('/', transaction);

module.exports = router;
