const express = require('express');
const mongoose = require('mongoose');
const Reviews = require('./reviews.model');
const Product = require('../products/product.model'); // Ensure Product model is imported

const router = express.Router();

router.post("/post-review", async (req, res) => {
    try {
        const { comment, rating, productId, userId } = req.body;

        // ✅ Validate request body
        if (!comment || !rating || !productId || !userId) {
            return res.status(400).json({ message: "All fields (comment, rating, productId, userId) are required" });
        }

        // ✅ Validate rating value
        const ratingValue = Number(rating);
        if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
            return res.status(400).json({ message: "Invalid rating value (must be between 1 and 5)" });
        }

        // ✅ Validate ObjectId format
        if (!mongoose.isValidObjectId(productId) || !mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid productId or userId format" });
        }

        // ✅ Ensure product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // ✅ Check if the user has already reviewed the product
        let review = await Reviews.findOne({ productId, userId });

        if (review) {
            review.comment = comment;
            review.rating = ratingValue;
        } else {
            review = new Reviews({ comment, rating: ratingValue, productId, userId });
        }

        await review.save();

        // ✅ Recalculate and update product's average rating
        const reviews = await Reviews.find({ productId });
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        product.rating = averageRating;
        await product.save();

        return res.status(200).json({
            message: "Review submitted successfully",
            reviews,
            averageRating: averageRating.toFixed(2)
        });

    } catch (error) {
        console.error("Error posting review:", error.message, error.stack);
        return res.status(500).json({ message: "Failed to post review", error: error.message });
    }
});
//
//get all review with count
router.get("/total-reviews",async(req,res)=>{
    try{
        const totalReviews=await Reviews.countDocumnets({});
        res.status(200).send({})
    }
    catch(error){
        console.error("Error getting review ",error);
        res.status(500).send({message:"Failed to get review count"});

    }
})

router.get("/:userId",async(req,res)=>{
    const {userId} = req.params;
    if(!userId){
        return res.status(400).send({message:"user ID is required"});
    }
    try{
        const reviews=await Reviews.find({userId:userId}).sort({createdAt:-1})
        if(reviews.length===0)
        {
            return res.status(404).send({message:'No reviews found'})
        }
        res.status(200).send(reviews);

    }catch(error)
    {
        console.error("error fetching reviews by user",error);
        res.status(500).send({message:"Failed to get review by user"});
    }
})



module.exports = router;
