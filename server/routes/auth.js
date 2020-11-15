const express = require("express");
const router = express.Router();

// middleware
const { authenticateToken } = require("../middleware/auth.js");

// authentication controller
const { createOrUpdateUser } = require("../controllers/auth.js");

router.post("/create-or-update-user", authenticateToken, createOrUpdateUser);

module.exports = router;
