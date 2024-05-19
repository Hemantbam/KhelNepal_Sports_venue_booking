const Payment = require('../model/payment');
const Venue = require('../model/venue'); // Import the Venue model
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

        const userId = decodedToken.id;
        const userRole = decodedToken.role;

        // Retrieve payments based on the user's role
        let payments;
        if (userRole === 'admin' && req.query.all) {

            payments = await Payment.find();
        } else if ((userRole === 'venue' || userRole === 'admin')) {
            // If the user is a venue manager, find venues managed by the user
            const venues = await Venue.find({ managedBy: userId });
            const venueIds = venues.map(venue => venue._id);

            // Find payments associated with the venues owned by the user
            payments = await Payment.find({ venueid: { $in: venueIds } });
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        return res.status(200).json({ payments });
    } catch (error) {
        return res.status(500).json({ message: `Error retrieving payments: ${error.message}` });
    }
}


async function findPaymentById(paymentId) {
    // Find payment by ID in the database
    try {
        const payment = await Payment.findById(paymentId);
        return payment;
    } catch (error) {
        throw new Error(`Error finding payment: ${error.message}`);
    }
}

async function updatePayments(paymentId, setRedirect) {
    // Update payment in the database
    try {
        await Payment.findByIdAndUpdate(paymentId, { redirected: setRedirect });
    } catch (error) {
        throw new Error(`Error updating payment: ${error.message}`);
    }
}

async function editPayments(req, res) {
    // Extract token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Decode the token to get user information
    const decodedToken = jwt.decode(token);

    // Check if the role is 'admin'
    if (decodedToken.role === 'admin') {
        // Extract payment ID from the request body
        const paymentId = req.body.id;

        // Find the payment by ID
        const payment = await findPaymentById(paymentId);

        if (!payment) {
            // If payment with given ID is not found, send a not found error
            return res.status(404).json({ message: 'Payment not found.' });
        }

        // Set redirect based on req.body data
        const setRedirect = req.body.setRedirect;

        // Update Payments based on the setRedirect value
        try {
            await updatePayments(paymentId, setRedirect);
            // Send a response indicating success
            res.status(200).json({ message: 'Payment updated successfully.' });
        } catch (error) {
            // If there's an error updating the payment, send a server error response
            res.status(500).json({ message: `Error updating payment: ${error.message}` });
        }
    } else {
        // If the user is not an admin, send a forbidden error
        res.status(403).json({ message: 'Forbidden: Only admins can edit payments.' });
    }
}

module.exports = {
    getPayments,
    editPayments
};
