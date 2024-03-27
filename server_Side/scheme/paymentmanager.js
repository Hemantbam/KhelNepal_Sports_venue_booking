const Payment = require('../model/payment');
const Booking = require('../model/booking');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../Datas');


// Function to retrieve all payments with optional filtering
async function getPayments(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, jwtSecret);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
      
        const userId = decodedToken.userId;
        const userRole = decodedToken.role;

        // Retrieve payments based on the user's role
        let payments;
        if (userRole === 'admin') {
            // If the user is an admin, retrieve all payments
            payments = await Payment.find();
        } else if (userRole === 'venue') {
            // If the user is a venue manager, retrieve payments associated with their bookings
            const bookings = await Booking.find({ user: userId });
            const bookingIds = bookings.map(booking => booking._id);
            payments = await Payment.find({ bookingid: { $in: bookingIds } });
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        return res.status(200).json({ payments });
    } catch (error) {
        return res.status(500).json({ message: `Error retrieving payments: ${error.message}` });
    }
}

module.exports = {
    getPayments
};
