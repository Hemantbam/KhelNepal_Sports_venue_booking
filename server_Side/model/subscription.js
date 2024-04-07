const mongoose = require("mongoose");

// Define the payment schema
const subscribeSchema = new mongoose.Schema({
  
    email: {
        type: String, // Specify the type as Object
        required: true
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
const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = Subscribe;
