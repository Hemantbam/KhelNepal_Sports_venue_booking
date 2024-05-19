const mongoose = require("mongoose");

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue', // Reference to the Venue model
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for the person making the booking
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    startDate: {
        type: Date, // Date field for the booking date
        required: true
    },
    endDate: {
        type: Date, // Date field for the booking date
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
    reason:{
        type:String,
        default:''
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'], // Possible statuses for a booking
        default: 'pending'
    },
    paymentType: {
        type:String,
        required:true,
    },
    price:{
        type:Number
    }
});

// Create the Booking model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
