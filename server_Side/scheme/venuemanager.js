const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { jwtSecret } = require("../Datas");

// Middleware to authenticate venue managers
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