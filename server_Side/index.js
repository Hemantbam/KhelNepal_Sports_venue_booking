// Import necessary modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { adminAuth, userAuth, getUsers } = require("./scheme/auth.js");
const { venueManagerAuth } = require("./scheme/venuemanager.js");
const connectDB = require("./Database/database.js");
const authroute = require("./Route/authroute.js");
const venueroute = require("./Route/venueroute.js");
const bookingroute = require("./Route/bookingroute.js");
const reviewroute = require("./Route/ReviewRoute.js");
const paymentroute = require("./Route/paymentroute.js");
const friendroute = require("./Route/friendroute.js");
const Subscribe = require('./model/subscription.js'); 
const path = require('path');
const Contact = require("./model/contact.js");

// Create the Express app
const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authroute);
app.use("/api/", venueroute);
app.use("/api/", bookingroute);
app.use('/api', paymentroute);
app.use('/api', reviewroute);
app.use('/api/', friendroute);
// Connecting to the database
connectDB();

// Start the server
const server = app.listen(PORT, () =>
  console.log(`Server connected to port ${PORT}`)
);

// Handling unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

// Routes
app.get("/adminauth", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/venueauth", venueManagerAuth, (req, res) => res.send("Venue Manager Route"));
app.get("/basicauth", userAuth, (req, res) => res.send("User Route"));

//Users
app.get("/api/allusers", getUsers);

// Serve static files
app.use('/uploads/profile/', express.static(path.join(__dirname, 'uploads/profile')));
app.use('/uploads/venues/', express.static(path.join(__dirname, 'uploads/venues')));
app.use('/uploads/panimage/', express.static(path.join(__dirname, 'uploads/panimage')));



// Subscribe route
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists in the database
    const existingSubscriber = await Subscribe.findOne({ email });

    if (existingSubscriber) {
      // If the email already exists, return a message indicating that the user is already subscribed
      return res.status(409).json({ success: false, message: 'You are already subscribed!' });
    } else {
      // If the email doesn't exist, create a new subscription record
      const newSubscriber = new Subscribe({ email });
      await newSubscriber.save();

      // Return a success message
      return res.status(200).json({ success: true, message: 'Subscription successful!' });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error subscribing:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while subscribing. Please try again later.' });
  }
});
app.post("/api/contact", async (req, res) => {
  try {
    const { email,subject,message, } = req.body;

    // Check if the email already exists in the database


      // If the email doesn't exist, create a new subscription record
      const newSubscriber = new Contact({ email, subject, message });
      await newSubscriber.save();

      // Return a success message
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error sending Message:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while sending Message. Please try again later.' });
  }
});
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Retrieve all contacts from the database
    res.status(200).json(contacts); // Send contacts to the frontend
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" }); // Handle errors
}
});
app.get("/api/subscribe", async (req, res) => {
  try {
    const contacts = await Subscribe.find(); // Retrieve all contacts from the database
    res.status(200).json(contacts); // Send contacts to the frontend
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" }); // Handle errors
}
});

app.put("/api/contact", async (req, res) => {
  try {
    const { _id, reached } = req.body; // Corrected variable name

    // Check if the contact exists in the database
    const existingContact = await Contact.findById(_id);
    if (!existingContact) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }

    existingContact.reached = reached;
    await existingContact.save();

    // Return a success message
    return res.status(200).json({ success: true, message: 'Contact updated successfully.' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error updating contact:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while updating contact. Please try again later.' });
  }
});