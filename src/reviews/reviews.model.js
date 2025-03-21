const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: { type: String, required: true },  // Ensure required
    rating: { type: Number, required: true, min: 1, max: 5 },  // Ensure min/max rating
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Fixed field name
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Fixed field name
}, { timestamps: true });

module.exports = mongoose.model("Reviews", reviewSchema);
