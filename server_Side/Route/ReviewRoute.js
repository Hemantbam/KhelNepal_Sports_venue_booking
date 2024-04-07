const express = require("express");
const { getReviews, createReview } = require("../scheme/Reviewmanager");
const router = express.Router();

// Route to get all reviews
router.get("/reviews", getReviews);

// Route to create a review
router.post("/reviews", createReview);

module.exports = router;
