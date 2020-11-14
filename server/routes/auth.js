const express = require("express");
const router = express.Router();

// middleware
const { authenticate } = require("../middleware/auth");

// authentication controller
const { createOrUpdateUser } = require("../controllers/auth");

router.post("/create-or-update-user", authenticate, createOrUpdateUser);

module.exports = router;
