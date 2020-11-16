// create router
const express = require("express");
const router = express.Router();

// middleware imports
const {
  authenticateToken,
  authenticateAdmin,
} = require("../middleware/auth.js");

// authentication controller imports
const { createOrUpdateUser, currentUser } = require("../controllers/auth.js");

// User Routes
router.post("/create-or-update-user", authenticateToken, createOrUpdateUser);
router.post("/current-user", authenticateToken, currentUser);

// Admin Routes
router.post(
  "/current-admin",
  authenticateToken,
  authenticateAdmin,
  currentUser
);

module.exports = router;
