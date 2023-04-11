const mongoose = require("mongoose");

var priceSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },



}, {
    timestamps: true
});

const price = mongoose.model("price", priceSchema);

module.exports = price;