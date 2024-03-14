const mongoose = require("mongoose");

// Define the venue schema
const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    managedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for venue managers
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    capacity: {
        type: Number,
        required: true
    },
    image:{
        type:String
    },
    facilities: {
        type: String // Assuming facilities are represented as an array of strings
    }
});

// Create the Venue model
const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
