const mongoose = require("mongoose");

// Define the payment schema
const ReviewScheme = new mongoose.Schema({

    venueid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        unique: true,
        required: true
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    comment:{
        type:String,
        maxLength: 250,
        required:true
    },
    rating:{
        type:Number,
        default:0
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
