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
       if((userRole === 'venue'||userRole === 'admin')) {
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

module.exports = {
    getPayments
};
