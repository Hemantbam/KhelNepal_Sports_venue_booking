const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const Payment = require("../model/payment");
const Booking = require("../model/booking");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const { API, mailOptions, jwtSecret } = require("../Datas");
const Venue = require("../model/venue");


// Create a transporter for sending emails
const transporter = nodemailer.createTransport(mailOptions);

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, or Password not provided" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    // Check if the username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    // Check if the email is already associated with an existing user
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already associated with an existing account" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
    });

    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      { id: user._id, username, email, role: user.role },
      jwtSecret,
      { expiresIn: maxAge }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      message: "User successfully created",
      user: user._id,
      token: token
    });
  } catch (error) {
    res.status(400).json({
      message: "User not successfully created",
      error: error.message,
    });
  }
};
exports.login = async (req, res, next) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Username/Email or Password not provided" });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: maxAge }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      return res.status(200).json({
        message: "User successfully logged in",
        user: user._id,
        token: token
      });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  // Decode token to get user information
  console.log(req.file);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtSecret);
    console.log('Decoded Token:', decodedToken);
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
const {role,username,email}=decodedToken;  
  if (role == 'admin') {
    id = req.query.id;
  } else {
    id = decodedToken.id;
  }

  if (!id || !role || !username || !email) {
    return res.status(400).json({ message: "Role, username, email, or Id not provided" });
  }

  try {
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if ((role === "basic" || role === "venue") && username !== userToUpdate.username) {
      return res.status(403).json({ message: "Unauthorized to update this profile" });
    }

    // Update logic for admins
    if (role === "admin") {
      updateAdminProfile(req, userToUpdate);
    } else {
      updateNonAdminProfile(req, userToUpdate, role);
    }

    await userToUpdate.save();

    return res.status(200).json({ message: "Update successful", user: userToUpdate });
  } catch (error) {
    console.error("Error updating user:", error); // Log the error for debugging
    return res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

function updateAdminProfile(req, userToUpdate) {
  const { role, isRejected, venuereq, ...otherFields } = req.body;

  // Ensure admin can only update role
  if (role && userToUpdate.role !== 'admin') {
    userToUpdate.role = role;
  }

  // Update isRejected field if provided
  userToUpdate.isRejected = isRejected !== undefined ? isRejected : userToUpdate.isRejected;

  // Update venuereq field if provided
  userToUpdate.venuereq = venuereq !== undefined ? venuereq : userToUpdate.venuereq;

  // Update nested fields
  for (const key in otherFields) {
    const [parentField, childField] = key.split('.');
    if (parentField === 'address' || parentField === 'businessDetails') {
      if (!userToUpdate[parentField]) {
        userToUpdate[parentField] = {};
      }
      userToUpdate[parentField][childField] = req.body[key];
    }
  }

  // Update profile picture if provided
  if (req.file) {
    userToUpdate.profilePicture = `uploads/profile/${req.file.filename}`;
  }
}

function updateNonAdminProfile(req, userToUpdate, roleE) {
  const { fullName, PAN, phoneNumber, venuereq, role, isRejected, ...otherFields } = req.body;

  // Update basic profile information
  userToUpdate.fullName = fullName || userToUpdate.fullName;
  userToUpdate.PAN = PAN || userToUpdate.PAN;
  userToUpdate.phoneNumber = phoneNumber || userToUpdate.phoneNumber;

  // Update isRejected field if provided
  userToUpdate.isRejected = isRejected !== undefined ? isRejected : userToUpdate.isRejected;

  // Update venuereq field if provided
  userToUpdate.venuereq = venuereq !== undefined ? venuereq : userToUpdate.venuereq;

  // Update nested fields
  for (const key in otherFields) {
    const [parentField, childField] = key.split('.');
    if (parentField === 'address' || parentField === 'businessDetails') {
      if (!userToUpdate[parentField]) {
        userToUpdate[parentField] = {};
      }
      userToUpdate[parentField][childField] = req.body[key];
    }
  }

  // Update profile picture if provided
  userToUpdate.profilePicture = req.file ? `uploads/profile/${req.file.filename}` : userToUpdate.profilePicture;

  // Update venuereq field for basic users
  if (roleE === 'basic') {
    userToUpdate.venuereq = venuereq || userToUpdate.venuereq;
  }

  // Update role and venuereq field for admin users
  if (roleE === 'admin') {
    userToUpdate.venuereq = false;
    userToUpdate.role = role || userToUpdate.role;
  }
}

exports.deleteUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    console.log("decoded", decodedToken);
    if (decodedToken.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete users' });
    }

    const userId = req.query.id; // Assuming the user ID is passed in the query parameter 'id'
    if(userId==decodedToken.id) {
      return res.status(400).json({message:"You cannot delete yourself"})
    }
    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find venues managed by the user
    const venues = await Venue.find({ managedBy: userId });

    // Delete venues managed by the user
    await Venue.deleteMany({ managedBy: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: 'User and associated venues successfully deleted' });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};




exports.adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          try {
            const user = await User.findById(decodedToken.id).select('-password'); // Exclude the password field
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
            // Attach user data to the request object
            req.user = user;
            res.status(200).json({ user });
          } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
          }
        }
      }
    });
  } else {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "basic") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          try {
            const user = await User.findById(decodedToken.id);
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
            // Attach user profile data to the response object
            res.locals.userData = { id: user.id, username: user.username, email: user.email, profile: user.profilePicture };
            res.json({ message: "Authorized", user: res.locals.userData }); // Include user object in the response
          } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
          }
        }
      }
    });
  } else {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }
};



exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random token with a length between 4 to 8 characters
    const resetToken = uuidv4().slice(0, Math.floor(Math.random() * 5) + 4);

    user.resetToken = resetToken;
    await user.save();

    const resetLink = `${API}reset/token=${resetToken}`;

    const mailOptions = {
      from: 'sachinsubedi616@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>To reset your password, click on the following link: <a href="${resetLink}">Reset Password</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending reset token:", error);
        return res.status(500).json({ message: "Failed to send reset token via email" });
      } else {
        console.log("Reset token sent successfully:", info.response);
        return res.status(200).json({ message: "Reset token sent successfully.Check your Mail" });
      }
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { newPassword, token } = req.body;

  try {
    console.log('Attempting to reset password...');

    const user = await User.findOne({ resetToken: token });

    if (!user) {
      console.log('User not found or token expired:', token);
      return res.status(404).json({ message: "User not found or token expired" });
    }

    console.log('User found. Hashing new password...');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    console.log('Updating user password...');

    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    console.log('Password reset successfully.');

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.getUsers = async (req, res, next) => {
  try {
    // Check if ID is provided in query params
    const { id, venuereq } = req.query;

    let users;
    if (id) {
      // If ID is provided, find user by ID
      users = await User.findById(id, 'username fullName profilePicture email role ');
    } else if (venuereq) {
      users = await User.find({
        venuereq: true
      }, 'username fullName profilePicture email role');
    }
    else {
      // If no ID provided, retrieve all users with necessary fields
      users = await User.find({}, 'username fullName profilePicture email role');
    }

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.getUserForAdmin = async (req, res) => {
  try {
    // Extract the bearer token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Decode the bearer token to get the role of the user
    const decodedToken = jwt.verify(token, jwtSecret);

    // Check if the user's role is 'admin'
    if (decodedToken.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Fetch the user data from the database excluding the password field
    const user = await User.findById(req.query.id).select('-password');

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as the response
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};