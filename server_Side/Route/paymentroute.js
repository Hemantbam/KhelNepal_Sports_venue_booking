const express = require('express');
const router = express.Router();
const { getPayments,editPayments } = require('../scheme/paymentmanager');

// Define route for fetching payments
router.get('/payments', getPayments);
router.put('/payments', editPayments);

module.exports = router;
