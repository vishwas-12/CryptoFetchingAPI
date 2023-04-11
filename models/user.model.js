const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
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