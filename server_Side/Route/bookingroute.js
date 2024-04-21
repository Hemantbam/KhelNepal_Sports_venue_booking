const express = require('express');
const router = express.Router();
const bookingManager = require('../scheme/bookingmanager');

// Route to create a new booking
router.post('/bookings', bookingManager.createBooking);

// Route to get all bookings or filter bookings by ID, user, or venue
router.get('/bookings', async (req, res) => {
    try {
        const { id, user, venue, status } = req.query;
        let query = {};

        // Add filters based on query parameters
        if (id) {
            query._id = id;
        }
        if (user) {
            query.user = user;
        }
        if (venue) {
            query.venue = venue;
        }
        if(status) {
            query.status = status;
        }

        // Get bookings based on the constructed query
        const bookings = await bookingManager.getBookings(query);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a booking by ID
router.put('/bookings', async (req, res) => {
    try {
        const updatedBooking = await bookingManager.updateBooking(req, req);
        res.json(updatedBooking);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Route to delete a booking by ID
router.delete('/bookings/:id', async (req, res) => {
    try {
        const deletedBooking = await bookingManager.deleteBooking(req.params.id, req.headers.authorization);
        res.json(deletedBooking);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
