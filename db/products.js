var mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product: String,
    price: String,
    category: String,
    company : String,
    userID: String
})
module.exports = mongoose.model("products", ProductSchema)