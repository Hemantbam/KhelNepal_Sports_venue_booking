
const { uploadvenue } = require("../Extra/multer.js");
const { venueManagerAuth, getVenues, addVenue, updateVenue, deleteVenue } = require("../scheme/venuemanager.js"); // Import venue manager middleware and controller functions
const express = require("express");
const router = express.Router();

router.get("/venues",  getVenues); // Get all venues
router.post("/venues", uploadvenue.single('image'), addVenue); // Add a new venue
router.put("/venues/:id", venueManagerAuth, updateVenue); // Update an existing venue
router.delete("/venues/:id", venueManagerAuth, deleteVenue); // Delete a venue

module.exports = router;
