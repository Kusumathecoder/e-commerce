const express = require("express");
const mongoose = require("mongoose");
const Product = require("./product.model");
const Reviews = require("../reviews/reviews.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Create a product
router.post(
    "/create-product",
    verifyToken,
    verifyAdmin,
    [
        body("name").notEmpty().withMessage("Product name is required"),
        body("price").isNumeric().withMessage("Price must be a number"),
        body("category").notEmpty().withMessage("Category is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newProduct = new Product({ ...req.body });
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ message: "Failed to create product", error: error.message });
        }
    }
);

// Get all products with filters
router.get("/", async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
        let filter = {};

        if (category && category.toLowerCase() !== "all") filter.category = category;
        if (color && color.toLowerCase() !== "all") filter.color = color;
        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) filter.price = { $gte: min, $lte: max };
        }

        const parsedPage = Math.max(1, parseInt(page, 10));
        const parsedLimit = Math.max(1, parseInt(limit, 10));
        const skip = (parsedPage - 1) * parsedLimit;

        const products = await Product.find(filter)
            .skip(skip)
            .limit(parsedLimit)
            .sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    // Allow fetching by numeric IDs as well (if applicable)
    if (!mongoose.isValidObjectId(id) && isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
});

// Update a product
router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
});

// Delete a product
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product" });
    }
});

module.exports = router;