
const express = require("express");
const { getPayments } = require("../scheme/paymentmanager");
const router = express.Router();

router.get("/payments", getPayments); // Get all payments

module.exports = router;
