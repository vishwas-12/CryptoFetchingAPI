const axios = require('axios');
const express = require("express");
const transaction = async (req, res) => {

    const { address } = req.query;

    const APIResp = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`);
    // storing the transaction data of a user by using axios and calling the provided API 
    try {
        if (APIResp.data.status === "0")
            throw new Error("Invalid address");
        return res.status(200).json({
            status: "Successful",
            result: APIResp.data.result

        })
    }
    catch (err) {

        return res.status(400).json({
            status: "Failed",
            error: err.message
        })
    }

}

module.exports = transaction;