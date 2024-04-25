const Booking = require('../model/booking');
const Payment = require('../model/payment');
const Venue = require('../model/venue');
// Function to create a new booking
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { jwtSecret } = require('../Datas');
function createBooking(req, res) {
    const { bookingData, token, khaltiData } = req.body;

    // Decode the JWT token to extract user information
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, jwtSecret);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error decoding token: ${error.message}` });
    }

    // Extract the user ID from the decoded token
    const userId = decodedToken.id;


    // Create a new booking object with converted startTime and endTime
    const newBookingData = {
        ...bookingData,
        user: userId // Add user ID to the booking data
    };

    // Verify the payment with Khalti's API and create the booking
    let config = {
        headers: { 'Authorization': 'Key test_secret_key_9571ebc81db14cb4be5154e43371036a' }
    };

    axios.post("https://khalti.com/api/v2/payment/verify/", khaltiData, config)
        .then(khaltiResponse => {
            console.log("Khalti Response:", khaltiResponse.data); // Log Khalti response for debugging

            if (khaltiResponse.data && khaltiResponse.data.state && khaltiResponse.data.state.name === "Completed") {
                // Payment verification successful, proceed to create the booking
                Booking.create(newBookingData)
                    .then(newBooking => {
                        // Create the payment entry
                        const serializedData = JSON.stringify(khaltiResponse.data);
                        Payment.create({
                            bookingid: newBooking._id,
                        venueid:bookingData.venue,
                            amount: khaltiData.amount*0.95,
                            paymentdetails: serializedData,
                        })
                            .then(newPayment => {
                                res.status(200).json({ message: "Payment Verified and Booking created successfully", booking: newBooking, payment: newPayment });
                            })
                            .catch(error => {
                                console.error(`Error creating payment entry: ${error.message}`);
                                return res.status(500).json({ message: `Error creating payment entry: ${error.message}` });
                            });
                    })
                    .catch(error => {
                        console.error(`Error creating booking: ${error.message}`);
                        return res.status(500).json({ message: `Error creating booking: ${error.message}` });
                    });
            } else {
                console.error("Payment verification failed");
                return res.status(400).json({ message: "Payment verification failed" });
            }
        })
        .catch(error => {
            console.error(`Error verifying payment: ${error.message}`);
            return res.status(500).json({ message: `Error verifying payment: ${error.message}` });
        });
}
// Function to retrieve all bookings with optional filtering
async function getBookings(filter = {}) {
    try {
        const bookings = await Booking.find(filter);
        return bookings;
    } catch (error) {
        throw new Error(`Error retrieving bookings: ${error.message}`);
    }
}

// Function to retrieve a booking by ID
async function getBookingById(bookingId) {
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    } catch (error) {
        throw new Error(`Error retrieving booking: ${error.message}`);
    }
}
async function updateBooking(req, res) {
    try {
        // Extract the token from the Authorization header
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authorizationHeader.split('Bearer ')[1];

        // Verify token
        const decodedToken = jwt.verify(token, jwtSecret);
        const userId = decodedToken.id;
        const userRole = decodedToken.role;

        // Find the booking by ID
        const booking = await Booking.findById(req.query.id);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Fetch the venue associated with the booking
        const venue = await Venue.findById(booking.venue);

        if (!venue) {
            throw new Error('Venue not found');
        }

        // Check if the user is an admin, the owner of the booking, or a venue manager managing the venue associated with the booking
        if (
            userRole === 'admin' ||
            (userRole === 'venue' && venue.managedBy.toString() === userId) ||
            (decodedToken.id === booking.user.toString() )
        ) {
            // Update the booking
            const updatedBooking = await Booking.findByIdAndUpdate(req.query.id, {status:req.body.status}, { new: true });
            if (!updatedBooking) {
                throw new Error('Booking not found');
            }
            return updatedBooking;
        } else {
            throw new Error('Unauthorized access to update booking');
        }


    } catch (error) {
        throw new Error(`Error updating booking: ${error.message}`);
    }
}

// Function to delete a booking by ID
async function deleteBooking(bookingId, token) {
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        const userId = decodedToken.userId;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Check if the user is the owner of the booking
        if (booking.user.toString() !== userId) {
            throw new Error('Unauthorized access to delete booking');
        }

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            throw new Error('Booking not found');
        }
        return deletedBooking;
    } catch (error) {
        throw new Error(`Error deleting booking: ${error.message}`);
    }
}

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};
