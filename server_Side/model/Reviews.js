const mongoose = require("mongoose");
const ReviewScheme = new mongoose.Schema({
    venueid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        maxLength: 250,
        required: true
    },
    rating: {
        type: Number,
        default: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Payment model
const Review = mongoose.model("Reviews", ReviewScheme);

module.exports = Review;
