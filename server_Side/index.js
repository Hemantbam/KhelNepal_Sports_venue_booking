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
const paymentroute = require("./Route/paymentroute.js");
const path = require('path');


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



