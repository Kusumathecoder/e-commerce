const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: 0 },
    image: { type: String, default: "" },
    color: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
