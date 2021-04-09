const express = require("express");
const router = express.Router();

//generate client secret key

//controller
const { createPaymentIntent } = require("../controllers/stripe");

//middleware
const { authenticateToken } = require("../middleware/auth.js");

//routes
router.post("/create-payment-intent", authenticateToken, createPaymentIntent);

module.exports = router;
