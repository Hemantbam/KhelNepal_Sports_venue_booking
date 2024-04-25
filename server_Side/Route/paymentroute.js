const express = require('express');
const router = express.Router();
const { getPayments } = require('../scheme/paymentmanager');

// Define route for fetching payments
router.get('/payments', getPayments);

module.exports = router;
