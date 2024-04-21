const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Venue = require("../model/venue");
const { jwtSecret } = require("../Datas");


exports.venueManagerAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = jwt.verify(token, jwtSecret);
            if (decodedToken.role !== "venue") {
                return res.status(401).json({ message: "Not authorized" });
            } else {
                // Fetch user data from the database based on decodedToken.id
                const user = await User.findById(decodedToken.id).select('-password'); // Exclude the password field
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                // Attach user data to the request object
                req.user = user;
                res.status(200).json({ user });
            }
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, token not available" });
    }
};

exports.getVenues = async (req, res, next) => {
    try {
        // Extract query parameters
        const { location, id, name, capacity, price, managedBy } = req.query;
        
        // Construct filter object based on provided query parameters
        const filter = {};
        if (location) filter.location = location;
        if (id) filter._id = id; // Assuming the venue ID is provided as "_id"
        if (name) filter.name = name;
        if (capacity) filter.capacity = parseInt(capacity, 10); // Ensure capacity is parsed as an integer
        if (price) filter.pricePerHour = parseFloat(price);  // Correctly parse price as a float
        if (managedBy) filter.managedBy = managedBy; // Filter
        
        // Check if any filter parameters are provided
        const hasFilters = Object.keys(filter).length > 0;

        // Fetch venues from the database with applied filters if any, otherwise fetch all venues
        const venues = hasFilters ? await Venue.find(filter) : await Venue.find();

        res.status(200).json({ venues });
    } catch (error) {
        // Handle specific errors and provide informative error messages
        console.error('Error fetching venues:', error);
        res.status(500).json({ message: "Failed to fetch venues. Please try again later." });
    }
};

exports.addVenue = async (req, res, next) => {
    // Extract venue data from request body
    const { name,userid, location, capacity, description, pricePerHour, facilities } = req.body;

    // Extract the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    try {
        // Decode the token to get the user ID and role
        const decodedToken = jwt.verify(token, jwtSecret);
        const userId = decodedToken.id;
        const userRole = decodedToken.role;

        // Check if the user role is 'venue' or 'admin'
        if (userRole !== 'venue' && userRole !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Create a new venue instance with the user ID
        const newVenue = new Venue({
            name,
            location,
            capacity,
            description,
            pricePerHour,
            facilities,
            image: `uploads/venues/${req.file.filename}`,
            managedBy: userid // Assign the user ID to the managedBy field
        });

        // Save the new venue to the database
        await newVenue.save();

        res.status(201).json({ message: "Venue added successfully", venue: newVenue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.updateVenue = async (req, res) => {
    try {
        // Extract token from request headers
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authorizationHeader.split('Bearer ')[1];
        
        // Verify token
        const decodedToken = jwt.verify(token, jwtSecret);

        // Extract venue ID from request parameters
        const { id } = req.query;

        // Retrieve the existing venue data
        const existingVenue = await Venue.findById(id);

        // Check if the decoded token ID matches managedBy of the venue or if role is admin
        if (decodedToken.id == existingVenue.managedBy || decodedToken.role == 'admin') {
            const { name, location, capacity, description, pricePerHour, facilities } = req.body;

        // Check if a file was uploaded and set the image accordingly
        console.log(req.file);
        const image = req.file ? `uploads/venues/${req.file.filename}` : existingVenue.image;

        const updatedVenue = await Venue.findByIdAndUpdate(
            { _id: id, managedBy: decodedToken.id },
            { name, location, capacity, description, pricePerHour, facilities, image },
            { new: true }
        );

        if (!updatedVenue) {
            return res.status(404).json({ message: "Venue not found" });
        }

        res.status(200).json({ message: "Venue updated successfully", venue: updatedVenue });
        }else{
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Extract updated venue data from request body
        
    } catch (error) {
        console.error('Error updating venue:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};



exports.deleteVenue = async (req, res) => {
    // Extract venue ID from request parameters
    const id = req.query.id; // Change from req.query.id to req.query.id directly

    try {
        // Extract the bearer token from the request headers
        const bearerHeader = req.headers.authorization;

        // Check if the bearer token is present
        if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
        }

        // Extract the token from the bearer header
        const token = bearerHeader.split(' ')[1];

        // Verify and decode the token to get user information
        const decodedToken = jwt.verify(token, jwtSecret);
        const userId = decodedToken.id;
        const userRole = decodedToken.role;

        // Find the venue by ID
        console.log(id);
        const venue = await Venue.findById(id);

        // Check if the venue exists
        if (!venue) {
            return res.status(404).json({ message: "Venue not found" });
        }

        console.log(venue.managedBy,",",userId);
        // Check if the user is admin or manages the venue
        if (userRole === 'admin' ||  venue.managedBy.toString() === userId) {
            // Delete the venue
            const deletedVenue = await Venue.findByIdAndDelete(id);
            return res.status(200).json({ message: "Venue deleted successfully", venue: deletedVenue });
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this venue" });
        }
    } catch (error) {
        // Handle errors
        console.error('Error deleting venue:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
