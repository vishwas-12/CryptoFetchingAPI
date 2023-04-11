const mongoose = require("mongoose");

const url = process.env.DBURL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const dbConn = mongoose.connection;

dbConn.on("error", console.error.bind(console, "Connection Error"));

dbConn.on("open", function () {
    console.log("DB Connection successful");
})