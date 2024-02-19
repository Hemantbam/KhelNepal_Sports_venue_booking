const express = require("express");
const router = express.Router();
const { register, login, update, deleteUser, adminAuth, forgotPassword, resetPassword } = require("../scheme/auth");
const { upload } = require("../Extra/multer");




router.post("/register", register);
router.post("/login", login);
router.put('/update', upload.single('profilePicture'), update);

router.delete("/deleteUser", adminAuth, deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
