const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const db = require("./database/db");
const cors = require("cors");
const cron = require('node-cron');

const axios = require("axios");
const priceModel = require('./models/price.model.js');
const transactionRouter = require('./Routes/transactionRoutes.routes');
const currentBalanceRouter = require('./Routes/balanceRoutes.routes');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());





const minutes = 10, the_interval = minutes * 60 * 1000;  //setting timestamp for every 10 minutes to record the ethereum price
setInterval(async () => {
    const price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`); //API to get ethereum price
    await priceModel.create({
        price: price.data.ethereum.inr  //storing price in the database
    })


}, the_interval);

app.use("/getTransactionList", transactionRouter);  //router called for transations of a user

app.use('/getBalance', currentBalanceRouter); // router called to get current balance of the user
app.listen(port, () => {
    console.log("Listening");
});