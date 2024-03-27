const mongoose = require("mongoose");

// Define the payment schema
const paymentSchema = new mongoose.Schema({
    bookingid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        unique: true,
        required: true
    },
    paymentdetails: {
        type: Object, // Specify the type as Object
        required: true
    },
    redirected:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    amount:{
        type:Number,
        default:0,
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
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
