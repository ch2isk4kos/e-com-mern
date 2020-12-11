const express = require("express");
const router = express.Router();

// middleware imports
const { authenticateToken } = require("../middleware/auth.js");

// authentication controller imports
const { userCart, userCartResponse } = require("../controllers/user");

router.post("/user/checkout", authenticateToken, userCart);
router.get("/user/checkout", authenticateToken, userCartResponse);

router.get("/user", (req, res) => {
  res.json({
    data: "User",
  });
});

module.exports = router;
