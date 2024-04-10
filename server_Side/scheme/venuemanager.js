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


// Controller function to update an existing venue
exports.updateVenue = async (req, res, next) => {
    // Extract venue ID from request parameters
    const { id } = req.params;
    // Extract updated venue data from request body
    const { name, location, capacity, description, pricePerHour, facilities } = req.body;

    try {
        // Find the venue by ID and update its data
        const updatedVenue = await Venue.findByIdAndUpdate(id, { name, location, capacity, description, pricePerHour, facilities }, { new: true });

        if (!updatedVenue) {
            return res.status(404).json({ message: "Venue not found" });
        }

        res.status(200).json({ message: "Venue updated successfully", venue: updatedVenue });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller function to delete a venue
exports.deleteVenue = async (req, res, next) => {
    // Extract venue ID from request parameters
    const { id } = req.params;

    try {
        // Find the venue by ID and delete it
        const deletedVenue = await Venue.findByIdAndDelete(id);

        if (!deletedVenue) {
            return res.status(404).json({ message: "Venue not found" });
        }

        res.status(200).json({ message: "Venue deleted successfully", venue: deletedVenue });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
