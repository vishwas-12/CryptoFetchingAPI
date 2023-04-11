const express = require('express');
const router = express.Router();
const getBalance = require('../controllers/getBalanceController.js');

router.get('/', getBalance); //calling getBalance controller

module.exports = router;
