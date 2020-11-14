const express = require("express");
const router = express.Router();

// authentication controller
const { createOrUpdateUser } = require("../controllers/auth");

router.get("/create-or-update-user", createOrUpdateUser);

module.exports = router;
