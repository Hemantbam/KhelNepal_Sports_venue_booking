const express = require("express");
const router = express.Router();
const { register, login, update, deleteUser, forgotPassword, resetPassword ,getUserForAdmin, verifyOtp} = require("../scheme/auth");
const { upload } = require("../Extra/multer");




router.post("/register", register);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.put('/update',  upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'panimage', maxCount: 1 }]), update);

router.delete("/deleteUser",  deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/user", getUserForAdmin);

module.exports = router;