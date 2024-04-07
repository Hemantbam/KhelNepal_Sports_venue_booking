const mongoose = require("mongoose");

// Define the payment schema
const contactSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        default:"Anonymous"
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required: true
    },
    reached:{
        type:Boolean,
        default:false
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
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
