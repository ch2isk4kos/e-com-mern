const express = require("express");
const router = express.Router();

// middleware
const { authenticateToken } = require("../middleware/auth.js");

// authentication controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth.js");

router.post("/create-or-update-user", authenticateToken, createOrUpdateUser);
router.post("/current-user", authenticateToken, currentUser);

module.exports = router;
