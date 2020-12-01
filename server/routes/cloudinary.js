// create router
const express = require("express");
const router = express.Router();

// middleware imports
const {
  authenticateToken,
  authenticateAdmin,
} = require("../middleware/auth.js");

// controllers
const { uploads, remove } = require("../controllers/cloudinary");

router.post("/upload-images", authenticateToken, authenticateAdmin, uploads);
router.post("/remove-images", authenticateToken, authenticateAdmin, remove);

module.exports = router;
