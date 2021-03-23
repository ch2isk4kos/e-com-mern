const express = require("express");
const router = express.Router();

// middleware
const { authenticateToken, authenticateAdmin } = require("../middleware/auth");

// controller
const { create, remove, index } = require("../controllers/coupon");

// routes
router.get("/coupons", index);
router.post("/coupon", authenticateToken, authenticateAdmin, create);
router.delete(
  "/coupon/:couponId",
  authenticateToken,
  authenticateAdmin,
  remove
);

module.exports = router;
