const axios = require("axios");
const express = require("express");

const getBalance = async (req, res) => {

    const { address } = req.query;  //extracting address of the user from the query

    const APIResp = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`);
    // storing the transaction data of a user by using axios and calling the provided API  to get the to and from requests

    try {
        if (APIResp.data.status === "0")
            throw new Error("Invalid address");
        const arr = APIResp.data.result;
        let balance = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].to === address) {
                balance += Number(arr[i].value); // adding balance if the address in to field is of the user
            }
            if (arr[i].from === address) {
                balance -= Number(arr[i].value); //substracting balance if the address in from field is of the user
            }
        }
        const price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`); //getting current price of ethereum
        return res.status(200).json({
            status: "Successful",
            result: {
                currBalance: balance,
                currPrice: price.data.ethereum.inr //displaying current balance and current price
            }

        })
    }
    catch (err) {

        return res.status(400).json({
            status: "Failed",  // throw error for bad request
            error: err
        })
    }

}

module.exports = getBalance;  //exporting get balance module to index file
