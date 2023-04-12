const mongoose = require("mongoose");

var userSchema = mongoose.Schema({  // to add transaction data of user in the database
    userAddress: {
        type: String,
        required: true
    },
    transaction: {
        type: Array,
        required: true
    }



}
);

const user = mongoose.model("user", userSchema);

module.exports = user;
