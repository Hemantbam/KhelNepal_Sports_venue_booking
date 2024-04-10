const Review = require('../model/Reviews');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../Datas');

// Function to retrieve all reviews
async function getReviews(req, res) {
    try {
        const { venueid } = req.query;
        // Assuming `Review` is your Mongoose model
        let reviews;
        if (venueid) {
            reviews = await Review.find({ venueid: venueid });
        } else {
            reviews = await Review.find();
        }
        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).json({ message: `Error retrieving reviews: ${error.message}` });
    }
}



async function createReview(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, jwtSecret);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { venueId, comment, rating, userId } = req.body;
        console.log(req.body);
        const isAdmin = decodedToken.role == 'admin';

        // Check if user is admin and userId is provided
        if (isAdmin && userId) {
            // Create a new review on behalf of the provided user
            const existingReview = await Review.findOne({ venueid: venueId, userid: userId });
            if (existingReview) {
                return res.status(400).json({ message: 'Review already given by this user for this venue' });
            }
            const newReview = new Review({
                venueid: venueId,
                userid: userId,
                comment,
                rating
            });
            await newReview.save();
        } else {
            // If not an admin, use the userId from token
            const userIdFromToken = decodedToken.id;
            console.log(userIdFromToken);
            const existingReview = await Review.findOne({ venueid: venueId, userid: userIdFromToken });
            if (existingReview) {
                return res.status(400).json({ message: 'Review already given by this user for this venue' });
            }
            const newReview = new Review({
                venueid: venueId,
                userid: userIdFromToken,
                comment,
                rating
            });
            await newReview.save();
        }

        return res.status(201).json({ message: 'Review created successfully' });
    } catch (error) {
        return res.status(500).json({ message: `Error creating review: ${error.message}` });
    }
}

module.exports = {
    getReviews,
    createReview
};
